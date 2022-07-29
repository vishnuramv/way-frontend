import DOMPurify from 'dompurify';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react'
import { Box } from "@chakra-ui/react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getSelectionText } from "draftjs-utils"
const toolbarOptions = {
    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'image', 'embedded', 'colorPicker', 'link', 'emoji', 'list', 'textAlign', 'history'],
    inline: {
        inDropdown: false,
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
    },
    blockType: {
        inDropdown: true,
        options: ['Normal', 'Blockquote', 'Code'],
    },
    link: {
        inDropdown: false,
        showOpenOptionOnHover: true,
        defaultTargetOption: '_blank',
        options: ['link', 'unlink'],
    },
    image: {
        urlEnabled: true,
        alignmentEnabled: false,
        previewImage: true,
        inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
        alt: { present: false, mandatory: false },
        className: "image-class",
        defaultSize: {
            height: 'auto',
            width: 'auto',
        },
    },
};

const RTEditor = ({ convertedContent, setConvertedContent }) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        // console.log(getSelectionText(editorState));
        let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(DOMPurify.sanitize(currentContentAsHTML));
    }
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <Box flex="0.75" >
            <Editor editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={toolbarOptions}
            />
        </Box>
    )
}

export default RTEditor