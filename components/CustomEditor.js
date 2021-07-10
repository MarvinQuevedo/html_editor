import EditorJs from "react-editor-js";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { useRef } from "react";
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from "@material-ui/core";


const convertDataToHtml = (blocks) => {
    var convertedHtml = "";
    blocks.map(block => {

        switch (block.type) {
            case "header":
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case "embded":
                convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
                break;
            case "paragraph":
                convertedHtml += `<p>${block.data.text}</p>`;
                break;
            case "delimiter":
                convertedHtml += "<hr />";
                break;
            case "image":
                convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                break;
            case "list":
                convertedHtml += "<ul>";
                block.data.items.forEach(function (li) {
                    convertedHtml += `<li>${li}</li>`;
                });
                convertedHtml += "</ul>";
                break;
            default:
                console.log("Unknown block type", block.type);
                break;
        }
    });
    return convertedHtml;
}
const CustomEditor = (props) => {

    const EDITOR_JS_TOOLS = {
        embed: Embed,
        table: Table,
        marker: Marker,
        list: List,
        warning: Warning,
        code: Code,
        linkTool: LinkTool,
        image: Image,
        raw: Raw,
        header: {
            class: Header,
            /**
             * This property will override the common settings
             * That means that this tool will have only Marker and Link inline tools
             * If 'true', the common settings will be used.
             * If 'false' or omitted, the Inline Toolbar wont be shown
             */
            inlineToolbar: ['marker', 'link'],
            config: {
                placeholder: 'Header'
            },
            shortcut: 'CMD+SHIFT+H'
        },

        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        simpleImage: SimpleImage,
    };
    const instanceRef = useRef(null)
    async function handleSave() {
        const savedData = await instanceRef.current.save()
        console.log("onSave");
        console.log(convertDataToHtml(savedData.blocks));
    }

    return (

        <div className={"editor-body"}>
            <div className={"html-editor"}>
                <EditorJs
                    instanceRef={(instance) => (instanceRef.current = instance)}
                    tools={EDITOR_JS_TOOLS} onChange={(value) => {

                    }}

                    onSave={props.onSave}
                    placeholder={"Ingrese su texto acá"}
                />
            </div>
            <div className={"save-button"}>
                <IconButton onClick={handleSave}>
                    <SaveIcon></SaveIcon>
                </IconButton>
            </div>
        </div>

    );
}

export default CustomEditor;