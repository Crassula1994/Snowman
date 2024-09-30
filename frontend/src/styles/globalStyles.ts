import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Pretendard";
        font-weight: 100;
        src: url("/assets/fonts/Pretendard-Thin.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 200;
        src: url("/assets/fonts/Pretendard-ExtraLight.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 300;
        src: url("/assets/fonts/Pretendard-Light.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 400;
        font-style: normal;
        src: url("/assets/fonts/Pretendard-Regular.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 500;
        src: url("/assets/fonts/Pretendard-Medium.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 600;
        src: url("/assets/fonts/Pretendard-SemiBold.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 700;
        font-style: bold;
        src: url("/assets/fonts/Pretendard-Bold.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 800;
        src: url("/assets/fonts/Pretendard-ExtraBold.woff2") format("woff2");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 900;
        src: url("/assets/fonts/Pretendard-Black.woff2") format("woff2");
    }
    
    * {
        font-family: "Pretendard", sans-serif;
        font-size: 16px;
        color: black;
    }

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    button,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
`;

export default GlobalStyle;
