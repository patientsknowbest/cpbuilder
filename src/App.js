import {useRef, useState} from 'react';
import './App.css';
import Parser from 'html-react-parser';
import $ from "jquery";
import {OverlayTrigger, Popover} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CodeMirror from '@uiw/react-codemirror';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';
import Nav from './nav';
function App() {

    library.add(faTrash);

    const [elems, setElems] = useState([]);

    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const dragPosition = useRef(0);

    const radioButtonHTML = '<div class="row">' +
        '  <div class="form-check input-group">' +
        '    <input class="form-check-input col-xs-1" type="radio" name="cp-radio-button-element-name" id="cp-radio-button-element-id" value="VALUE">' +
        '    <label class="form-check-label col-xs-10" for=cp-radio-button-element-for"> VALUE</label>' +
        '  </div>' +
        '</div>';

    const checkboxHTML = '<div class="row">' +
        '  <div class="form-check col-xs-12 pull-left input-group">' +
        '    <input class="form-check-input form-control" type="checkbox" name="cp-checkbox-element-name" id="cp-checkbox-element-id" value="VALUE"/>' +
        '    <label class="cp_label col-xs-10 pull-right" for="cp-checkbox-element-for">VALUE</label>' +
        '  </div>' +
        '</div>';

    const arrangeElem = () => {
        if ($('#element-option').length > 0) $('#element-option').html('');
        $('.highlighted').removeClass('.highlighted');

        //console.log(dragPosition.current);

        if (dragPosition.current > 0) {
            //duplicate element
            let _elems = [...elems];

            //remove and save the dragged element content
            const draggedItemCotent = _elems.splice(dragItem.current, 1)[0];

            //switch position
            _elems.splice(dragOverItem.current, 0, draggedItemCotent);

            //reset
            dragItem.current = null;
            dragOverItem.current = null;

            //update
            setElems(_elems);
        } else if (dragPosition.current < 0) {
            //remove it!
            //duplicate element
            let _elems = [...elems];

            //remove and save the dragged element content
            _elems.splice(dragItem.current, 1);

            //reset
            dragItem.current = null;
            dragOverItem.current = null;

            //update
            setElems(_elems);
        }
    }

    const handleAdding = (e) => {
    }

    const addDragElem = (e) => {
        if ($('#element-option').length > 0) $('#element-option').html('');
        if ($(e.target).closest('.indragitem').hasClass("highlighted")) $('.highlighted').closest('.indragitem').removeClass('.highlighted')

        if (dragPosition.current > 0) {
            let _elems = [...elems];
            _elems.splice(dragOverItem.current, 0, e.target.innerHTML);
            dragItem.current = null;
            dragOverItem.current = null;
            setElems(_elems);
        }
    }

    const DragOverEl = (e, i) => {
        if (!$(e.target).closest('.indragitem').hasClass("highlighted")) $(e.target).closest('.indragitem').addClass('highlighted');
        dragOverItem.current = i;
    }

    const DragLeaveEl = (e, i) => {
        if ($(e.target).closest('.indragitem').hasClass("highlighted")) $(e.target).closest('.indragitem').removeClass('highlighted');
    }

    const handleChange = (e) => {
        let _elems = [...elems];


        //index
        let i = $(e.target).attr('data-index');

        let el = $('<div/>').append(_elems[i])

        /* eslint-disable */
        $('.option-wrapper-inner').map(function () {
            let elsep = $(this).attr('data-element');

            //should we go with the element or remove it?
            if (!$(this).find('.headerelem input').is(":checked")) {

                //remove this element
                el.find(elsep).remove();
            } else {

                //set attribs
                $(this).find('.attrib-options .row').map(function () {

                    //console.log($(this).find('.col-sm-4').text());
                    if ($(this).find('.col-sm-4').text() === "Psc of input") {
                        let numberOfDynamicBlocks = parseInt($(this).find('.dynamicNumberInput').val(), 10);
                        const inputString = _elems[i];
                        const searchSubstring = '<div class="row">';
                        const regex = new RegExp(searchSubstring, 'g');
                        const occurrences = (inputString.match(regex) || []).length;

                        let currentInputHTML = '';
                        let closingDivsPosition = 0;
                        let startingBlockPosition = 0;

                        if (inputString.includes('type="checkbox"')) {
                            currentInputHTML = checkboxHTML;
                            closingDivsPosition = -12;
                            startingBlockPosition = 160 + (numberOfDynamicBlocks * 260);
                        } else if (inputString.includes('type="radio"')) {
                            currentInputHTML = radioButtonHTML;
                            closingDivsPosition = -18;
                            startingBlockPosition = 165 + (numberOfDynamicBlocks * 231);
                        }

                        if (occurrences < numberOfDynamicBlocks) {
                            let finalCheckBoxHTML = '';

                            for (let i = occurrences; i < numberOfDynamicBlocks; i++) {
                                finalCheckBoxHTML = finalCheckBoxHTML + currentInputHTML;
                            }

                            _elems[i] = _elems[i].slice(0, closingDivsPosition) + finalCheckBoxHTML + _elems[i].slice(closingDivsPosition);
                        }
                        if (occurrences > numberOfDynamicBlocks) {
                            _elems[i] = _elems[i].slice(0, startingBlockPosition) + _elems[i].slice(closingDivsPosition);
                        }

                        el = $('<div/>').append(_elems[i])
                    }

                    el.find(elsep).attr($(this).find('.col-sm-4').text(), $(this).find('.dynamicInput').val())
                });

                //sizes
                if ($(this).find('select').length > 0) {
                    let svl = el.find(elsep)

                    //class
                    if (el.find(elsep).hasClass('form-control')) el.find(elsep).removeClass('form-control');
                    if (el.find(elsep).hasClass('form-control-sm')) el.find(elsep).removeClass('form-control-sm');
                    if (el.find(elsep).hasClass('form-control-lg')) el.find(elsep).removeClass('form-control-lg');

                    svl.addClass($(this).find('select').val());
                }

                //content
                if ($(this).find('.contenttxt').length > 0) {
                    el.find(elsep).html($(this).find('.contenttxt').val())
                }
            }

        });
        /* eslint-enable */

        _elems.splice(i, 1, el.html());

        //update
        setElems(_elems);

        //close the box
        if ($('#element-option').length > 0) $('#element-option').html('');
    }

    const removeSelector = (e) => {
        // //console.log('remove el', $(e.target).closest('button').attr('data-index'));
        if ($('#element-option').length > 0) $('#element-option').html('');
        let _elems = [...elems];

        //remove and save the dragged element content
        _elems.splice($(e.target).closest('button').attr('data-index'), 1);

        //reset
        dragItem.current = null;
        dragOverItem.current = null;

        //update
        setElems(_elems);

    }


    const popoverLeft = (
        <Popover id="element-option" title="Popover right">
            <div className='eloption'>
                <div className='option_input'>demo content</div>
                <div className='row pt-2 pb-2 border bg-light bottombar'>
                    <div className='col-sm-6'>
                        <div className='row '>
                            <div className='col-sm-8'>
                                {/* <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Required : </label> */}
                            </div>
                            <div className='col-sm-4'>
                                <div className="form-check form-switch">
                                    {/* <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-6 align-right'>
                        <button onClick={handleChange} className="btn btn-primary btn-sm mr-2 appl">Apply</button>
                        <button onClick={removeSelector} className="btn btn-danger btn-sm ml-2 rele"><FontAwesomeIcon
                            icon="trash"/></button>
                    </div>
                </div>
            </div>
        </Popover>
    );

    const handleDetails = (e, i) => {
        if ($('.highlighted').length > 0) {
            $('.highlighted').each(function () {
                $(this).removeClass('highlighted');
            })
        }
        if (!$(e.target).hasClass('highlighted')) $(e.target).closest('.indragitem').addClass('highlighted');

        let outer = $('<div class="option-wrapper"></div>');


        //lets try to show the popover
        let $e;

        if ($(e.target).closest('.indragitem').find('.input-group').length > 0) {
            $e = $(e.target).closest('.indragitem').find('.input-group');
        } else if ($(e.target).closest('.indragitem').find('.form-floating').length > 0) {
            $e = $(e.target).closest('.indragitem').find('.form-floating');
        } else {
            $e = $(e.target).closest('.indragitem');
        }

        let editableNumberOfInput = false;
        let isLabelPresent = false;
        let isEditableInputPresent = false;
        let numberOfInputs = 0;

        //create the elemental form
        $e.children().each(function () {
            if (this.nodeName.toLowerCase() === "p") {
                isLabelPresent = true;
            }
            if (this.nodeName.toLowerCase() === "input") {
                isEditableInputPresent = true;
                numberOfInputs++;
            }

            if (isLabelPresent && isEditableInputPresent) {
                editableNumberOfInput = true;
            }

        });

        $($e).children().each(function () {

            //get class list
            if ($(this).hasClass('highlighed')) $(this).removeClass('highlighed');
            let cls = '';
            if ($(this).attr('class')) cls = $(this).attr('class').split(/\s+/);

            if (cls.length > 0) {
                cls = cls.join('.');
                cls = '.' + cls;
                if (cls[cls.length - 1] === ".") cls = cls.slice(0, -1);
            } else {
                cls = '';
            }


            let htm = $('<div class="option-wrapper-inner" data-element="' + this.nodeName.toLowerCase() + '' + cls + '"></div>');

            let headerelem = $('<div class="headerelem"/>')
            let nonattrib = $('<div class="nonattrib"/>')
            //text
            if (!(this.nodeName.toLowerCase() === "input" || this.nodeName.toLowerCase() === "textarea")) {
                headerelem.append('<div class="row optionrow"><div class="col-md-1"><div className="form-check form-switch"><input className="form-check-input switchelem" type="checkbox" checked role="switch" /></div></div><div class="col-md-10"><h6><span class="badge bg-secondary">' + this.nodeName + '</span></h6></div></div>');
                if (this.nodeName.toLowerCase() !== "hr" && this.nodeName.toLowerCase() !== "img" && this.nodeName.toLowerCase() !== "iframe") {
                    nonattrib.append('<div class="row optionrow"><div class="col-sm-4 text-right">Label text : </div><div class="col-sm-8"><input class="form-control form-control-sm dynamicInput contenttxt" type="text" value="' + $(this).html() + '"></div></div>')
                }
            } else {

                headerelem.append('<div class="row optionrow"><div class="col-md-1"><div className="form-check form-switch"><input className="form-check-input switchelem" type="checkbox" checked role="switch" disabled /></div></div><div class="col-md-10"><h6><span class="badge bg-secondary">' + this.nodeName + '</span></h6></div></div>');

                // These section are good to add node specific edit opportunities. Like below to a textarea we can add a flag if it's required or not.
                if (this.nodeName.toLowerCase() === "textarea") {
                }
            }
            htm.append(headerelem);
            htm.append(nonattrib);

            let ham = $('<div class="attrib-options"></div>');


            if (this.nodeName.toLowerCase() === "p" && editableNumberOfInput) {
                ham.append('<div class="row optionrow"><div class="col-sm-4 text-right the_prop">Psc of input</div><div class="col-sm-8"><input style="line-height: 30px; display: block; width: 50%; overflow-wrap: break-word; word-wrap: break-word;" class="form-control form-control-sm dynamicNumberInput" type="number" value="' + numberOfInputs + '" min="1"></div></div>')
            }

            if (this.nodeName.toLowerCase() === "hr") {

                $.each(this.attributes, function () {
                    if (this.specified) {
                        if (this.name === 'style') {
                            ham.append('<div class="row optionrow"><div class="col-sm-4 text-right the_prop">' + this.name + '</div><div class="col-sm-8"><input style="line-height: 45px; display: block; width: 100%; overflow-wrap: break-word; word-wrap: break-word;" class="form-control form-control-sm dynamicInput" type="text" value="' + this.value + '"></div></div>')
                            //console.log(this.ownerElement.style.height);
                            //console.log(this.ownerElement.style.backgroundColor);
                            // for (let styleElement of this.ownerElement.style) {
                            //   if (styleElement == 'height') {
                            //     ham.append('<div class="row optionrow"><div class="col-sm-4 text-right the_prop">' + this.name + '</div><div class="col-sm-8"><input class="form-control form-control-sm dynamicInput" type="text" value="' + this.ownerElement.style.height + '"></div></div>')
                            //   }
                            // }
                        }
                    }
                });
            }

            //attribs
            $.each(this.attributes, function () {
                // this.attributes is not a plain object, but an array of attribute nodes, which contain both the name and value
                if (this.specified) {

                    // NOTE: here we add extra editable options to the UI, but for now we'd not need editing class, style etc. attributes
                    if (this.name !== 'checked' && this.name !== 'class' && this.name !== 'rows' && this.name !== 'style' && this.name !== 'type' && this.name !== 'allowfullscreen') {
                        if (this.name !== 'placeholder' || this.value === 'PLACEHOLDER') {
                            if (this.name !== 'id' && this.name !== 'name' && this.name !== 'for') {
                                ham.append('<div class="row optionrow"><div class="col-sm-4 text-right the_prop">' + this.name + '</div><div class="col-sm-8"><input class="form-control form-control-sm dynamicInput" type="text" value="' + this.value + '"></div></div>')
                            }
                        }
                    }
                }
            });

            htm.append(ham);
            htm.append('<hr/>')

            if (this.nodeName.toLowerCase() === "a") {
                htm = $('<h4 style="margin-top: 15px; margin-left: 5px;">No editing possible</h4>');
                ham = '';
            }

            outer.append(htm);
        })

        setTimeout(function () {
            $('.option_input, .rele, .appl').attr('data-index', i);
            /* eslint-disable */
            $('.option_input').map(function () {
                $(this).html(outer);
            })
            /* eslint-enable */
        }, 200)

    }

    function process(str) {

        var div = document.createElement('div');
        div.innerHTML = str.trim();

        return format(div, 0).innerHTML;
    }

    function format(node, level) {

        var indentBefore = new Array(level++ + 1).join('  '),
            indentAfter = new Array(level - 1).join('  '),
            textNode;

        for (var i = 0; i < node.children.length; i++) {

            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);

            format(node.children[i], level);

            if (node.lastElementChild === node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
        return node;
    }

    const genHtml = (elem) => {
        let _elems = [...elem];
        _elems = _elems.map(function (a) {
            const inputString = a.toString();
            const updatedString = inputString.replace(/input-group/g, "");
            return updatedString
        })
        return process(_elems.join(' \n'));
    }

    function elementCounterByClassName(className) {
        return document.getElementsByClassName(className).length;
    }

    function createInputWithLabel() {
        let numberOfThisElementInDoc = elementCounterByClassName('cp-input-with-label');
        return '<div class="row" style="margin-top: 15px;">' +
            '<div class="col-sm-6 input-group">' +
            '<label class="cp-label cp-input-with-label" for=cp-for-input-with-label-' + numberOfThisElementInDoc + '>LABEL</label></div><div class="col-sm-6 input-group" style="margin-top: 15px;">' +
            '<input type="text" name=cp-input-name-with-label-' + numberOfThisElementInDoc + ' id=cp-id-input-with-label-' + numberOfThisElementInDoc + ' class="form-control" style="width: 100%;" placeholder="PLACEHOLDER"/>' +
            '<span id=cp-span-input-with-label-' + numberOfThisElementInDoc + ' class="help-block">HELP TEXT' +
            '</span>' +
            '</div>' +
            '</div>';
    }

    function createDateInputWithLabel() {
        let numberOfThisElementInDoc = elementCounterByClassName('cp-date-input-with-label');
        return '<div class="row cp-date-input-with-label" style="margin-top: 15px;">' +
            '<div class="col-sm-6 input-group">' +
            '<label class="cp_label" for=cp-for-date-input-with-label-' + numberOfThisElementInDoc + '>LABEL' +
            '</label>' +
            '</div>' +
            '<div class="col-sm-6 input-group" style="margin-top: 15px;">' +
            '<input type="date" name=cp-date-input-with-label-' + numberOfThisElementInDoc + ' id=cp-id-date-input-with-label-' + numberOfThisElementInDoc + ' class="form-control" placeholder="dd/mm/yyyy"/>' +
            '<span class="help-block">HELP TEXT' +
            '</span>' +
            '</div>' +
            '</div>';
    }

    function createSelectWithLabel() {
        let numberOfThisElementInDoc = elementCounterByClassName('cp-select-with-label');
        let numberOfSelect = elementCounterByClassName('cp-select');
        let numberOfSelectOption = elementCounterByClassName('cp-select-option');
        return '<div class="row cp-select-with-label" id=cp-select-id-' + numberOfThisElementInDoc + ' style="margin-top: 15px;">' +
            '<div class="col-sm-6 input-group">' +
            '<label class="cp_label" for="ID/NAME">LABEL' +
            '</label>' +
            '</div>' +
            '<div class="col-sm-6 input-group" style="margin-top: 15px;">' +
            '<select class="form-control input-group cp-select" name=cp-select-name' + numberOfThisElementInDoc + '-' + numberOfSelect + ' id=cp-select-id' + numberOfThisElementInDoc + '-' + numberOfSelect + '>' +
            '<option class="cp-select-option" id=cp-select-option-id' + numberOfThisElementInDoc + '-' + numberOfSelectOption + ' value="VALUE">VALUE' +
            '</option>' +
            '<option class="cp-select-option" id=cp-select-option-id' + numberOfThisElementInDoc + '-' + numberOfSelectOption + ' value="VALUE">VALUE' +
            '</option>' +
            '<option class="cp-select-option" id=cp-select-option-id' + numberOfThisElementInDoc + '-' + numberOfSelectOption + ' value="VALUE">VALUE' +
            '</option>' +
            '</select>' +
            '</div>' +
            '</div>'
    }

    function createTextAreaInputWithLabel() {
        let numberOfThisElementInDoc = elementCounterByClassName('cp-text-area-input-with-label');
        return '<div class="row" style="margin-top: 15px;">' +
            '<div class="col-sm-12 input-group">' +
            '<label class="cp_label cp-text-area-input-with-label" for=cp-for-text-area-with-label-' + numberOfThisElementInDoc + '>LABEL' +
            '</label>' +
            '<textarea class="form-control" name=cp-name-text-area-with-label-' + numberOfThisElementInDoc + ' id=cp-id-text-area-with-label-' + numberOfThisElementInDoc + ' rows="3" style="width: 100%;">' +
            '</textarea>' +
            '</div>' +
            '</div>';
    }

    function createRadioInputWithLabel() {
        let numberOfThisElementInDoc = elementCounterByClassName('cd-radio-element');
        return '<div class="row cd-radio-element" id=cp-checkbox-id-' + numberOfThisElementInDoc + ' style="margin-top: 15px;">' +
            '<div class="col-sm-6 input-group">' +
            '<p class="cp_label">LABEL' +
            '</p>' +
            '</div>' +
            '<div class="col-sm-6" style="margin-top: 15px;">' +
            radioButtonHTML +
            radioButtonHTML +
            '</div>' +
            '</div>' +
            '</div>';
    }

    function createCheckboxInputWithLabel() {
        let numberOfThisElementInDoc = elementCounterByClassName('cp-checkbox-element');
        return '<div class="row cp-checkbox-element" id=cp-checkbox-id-' + numberOfThisElementInDoc + ' style="margin-top: 15px;">' +
            '<div class="col-sm-6 input-group">' +
            '<p class="cp_label">LABEL' +
            '</p>' +
            '</div>' +
            '<div class="col-sm-6" style="margin-top: 15px;">' +
            checkboxHTML +
            checkboxHTML +
            '</div>' +
            '</div>';
    }

    let carePlanElements = [
        // Text input
        createInputWithLabel(),

        // Text area input
        createTextAreaInputWithLabel(),

        // Date input
        createDateInputWithLabel(),

        // Image element
        '<img src="LOCATION" alt="ALT TEXT" style="max-width: 720px; width: 100%; height: auto; margin-top: 15px;"></img>',

        // Return to top button
        '<a href="#top" class="btn arrow btn-primary" title="Back to Top" alt="Click here to return to the Table of Contents" style="margin-top:15px; margin-bottom:15px;">Back to Top</a>',

        // Go to save button
        '<a href="#fileUploadForm_save" class="btn arrow btn-primary" title="Back to Top" alt="Click here to save the Care Plan" style="margin-top:15px; margin-bottom:15px;">Go to Save Care Plan</a>',

        // Horizontal line separator
        '<hr class="cp_separator" style="height: 5px; background-color: black; margin-top: 5px; margin-bottom: 5px;"/>',

        // Responsive video embed
        '<div class="embed-responsive embed-responsive-16by9 input-group" style="margin: auto;"><iframe allowfullscreen="true" class="embed-responsive-item" src="https://www.youtube.com/embed/watch?v=pHhfNIIIDqg"></iframe></div>',

        // Radio inputs
        createRadioInputWithLabel(),

        // Checkbox inputs
        createCheckboxInputWithLabel(),

        // Select inputs
        createSelectWithLabel(),
        //'<div class="row" style="margin-top: 15px;"><div class="col-sm-6 input-group"><label class="cp_label" for="ID/NAME">LABEL</label></div><div class="col-sm-6 input-group" style="margin-top: 15px;"><select class="form-control input-group" name="ID/NAME" id="ID/NAME"><option value="--">Select</option><option value="VALUE">VALUE</option><option value="VALUE">VALUE</option></select></div></div>'
    ]

    return (
        <>
            <Nav/>
            <div className="container">
                <div className='row mt-3'>

                    <div
                        className='dustbin'
                        onDragEnter={(e) => {
                            //console.log(dragPosition.current);
                            dragPosition.current = -1;
                            if (!$(e.target).hasClass('dustact')) $(e.target).addClass('dustact')
                        }}
                        onDragLeave={(e) => {
                            if ($(e.target).hasClass('dustact')) $(e.target).removeClass('dustact');
                        }}

                    >
                        <FontAwesomeIcon icon="trash"/> Throw into the trash!
                    </div>

                    <div className='col-md-6 col-sm-6 inputs-option maxht'>

                        <div className='dragnoeffect' onDragEnter={(e) => dragPosition.current = 0}>

                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-home" type="button" role="tab"
                                            aria-controls="pills-home" aria-selected="true">Elements
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                            data-bs-target="#pills-profile" type="button" role="tab"
                                            aria-controls="pills-profile" aria-selected="false">Care Plan HTML Code
                                    </button>
                                </li>
                                {/* Care Plan renderer -> the rendered care plan will be visible just as it would look like on our site */}
                                {/* Disabled since the two tabs serve the same purpose and look exactly the same */}
                                {/*<li className="nav-item" role="presentation">*/}
                                {/*  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Care Plan Renderer</button>*/}
                                {/*</li>*/}

                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                     aria-labelledby="pills-home-tab" tabIndex="0">
                                    <div className="card maxh2">
                                        <div className="">
                                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                                <div className="accordion-item inputaccord">

                                                    <div id="flush-collapseOne" className=""
                                                         aria-labelledby="flush-headingOne"
                                                         data-bs-parent="#accordionFlushExample">
                                                        <div className="accordion-body">
                                                            {
                                                                carePlanElements && carePlanElements.map(function (xe, i) {
                                                                    return (
                                                                        <div
                                                                            className='input-text-add dragdropper'
                                                                            draggable="true"
                                                                            onDragStart={(e) => handleAdding(e)}
                                                                            onDragEnd={(e) => addDragElem(e)}
                                                                            key={i}>
                                                                            {Parser(xe)}
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                     aria-labelledby="pills-profile-tab" tabIndex="0">
                                    <div className="card maxh2">
                                        <div className="">
                                            <CodeMirror
                                                value={process('<div class="form-inline"><style media="screen">a {word-wrap: break-word;}.form-group {width: 100%; !important}.cp_label {font-size: 18px;font-weight: 900;}.cp_whiteBox {background-color:#ffffff; padding:15px; margin-bottom:10px; margin-top:10px; border-radius: 10px; border: 3px solid #014151;}</style><div class="cp_whiteBox"><div id="top"></div>').slice(0, -14) + genHtml(elems) + '\n  </div>\n</div>'}
                                                editable={false}
                                                extensions={[markdown({
                                                    base: markdownLanguage,
                                                    codeLanguages: languages
                                                })]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-6 col-sm-6 output_form maxht' onDragEnter={(e) => dragPosition.current = 1}>
                        {(elems.length < 1) && <div
                            className='empty'
                            onDragEnter={(e) => {
                                if (!$(e.target).hasClass('hover')) $(e.target).addClass('hover')
                            }}
                            onDragLeave={(e) => {
                                if ($(e.target).hasClass('hover')) $(e.target).removeClass('hover')
                            }}
                        >
                            Add elements to your form</div>}
                        {

                            elems && elems.map(function (e, i) {
                                return (
                                    <OverlayTrigger
                                        container={this}
                                        trigger="click"
                                        rootClose
                                        placement="left"
                                        overlay={popoverLeft}
                                        key={i}
                                    >
                                        <div
                                            className="input_elem indragitem"
                                            draggable="true"
                                            onClick={(e) => handleDetails(e, i)}
                                            onDragStart={(e) => dragItem.current = i}
                                            onDragEnter={(e) => DragOverEl(e, i)}
                                            onDragLeave={(e) => DragLeaveEl(e, i)}
                                            onDragEnd={(e) => arrangeElem(e)}
                                            onDragOver={(e) => e.preventDefault()}
                                        >
                                            {Parser(e)}
                                        </div>
                                    </OverlayTrigger>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;