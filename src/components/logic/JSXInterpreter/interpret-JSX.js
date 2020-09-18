import React from 'react'
import { html2json } from 'html2json'
import { Parser } from 'html-to-react'

import ArticleMeta from '../../blocks/ArticleMeta'
import BottomNotes from '../../blocks/BottomNotes'
import CopyValue from '../../blocks/CopyValue'
import Hero from '../../blocks/Hero'
import LibeLaboLogo from '../../blocks/LibeLaboLogo'
import Loader from '../../blocks/Loader'
import LoadingError from '../../blocks/LoadingError'
import LogoGlyph from '../../blocks/LogoGlyph'
import Photo from '../../blocks/Photo'
import Video from '../../blocks/Video'
import RasterMap from '../../blocks/RasterMap'
import ReadAlso from '../../blocks/ReadAlso'
import ShareArticle from '../../blocks/ShareArticle'
import Tweet from '../../blocks/Tweet'

import Grid from '../../layouts/Grid'
import Slot from '../../layouts/Slot'
import Article from '../../layouts/Article'

import Heading from '../../primitives/Heading'
import Svg from '../../primitives/Svg'

import Annotation from '../../text-levels/Annotation'
import AnnotationTitle from '../../text-levels/AnnotationTitle'
import BlockTitle from '../../text-levels/BlockTitle'
import Hat from '../../text-levels/Hat'
import InterTitle from '../../text-levels/InterTitle'
import Overhead from '../../text-levels/Overhead'
import PageTitle from '../../text-levels/PageTitle'
import Paragraph from '../../text-levels/Paragraph'
import ParagraphTitle from '../../text-levels/ParagraphTitle'
import SectionTitle from '../../text-levels/SectionTitle'
import Slug from '../../text-levels/Slug'
import Quote from '../../text-levels/Quote'

const h2r = new Parser()

export default function interpretJSX (input) {
  const inputAsJson = html2json(input)
  const result = recurseJson2JSX(inputAsJson)
  return result
}

function recurseJson2JSX (input) {
  const { node, tag, text, attr, child } = input
  if (node === 'text') return h2r.parse(text || '')
  else if (node === 'comment') return ''
  else if (node === 'root') return child ? child.map(kid => recurseJson2JSX(kid)) : []
  else if (node === 'element') {
    const children = child ? child.map(kid => recurseJson2JSX(kid)) : ''
    const attributes = { key: Math.random().toString(36).slice(2) }
    if (attr) {
      Object.keys(attr).forEach(key => {
        const jointValue = Array.isArray(attr[key]) ? attr[key].join(' ') : attr[key]
        const valueIsJavascriptExpression = (jointValue[0] === '{' && jointValue.slice(-1) === '}')
        if (!valueIsJavascriptExpression) attributes[key] = jointValue
        else {
          const valueWithTempReplacedEscapedSglQuotes = jointValue.slice(1, -1).replace(/\\'/gm, '[SGLQUOTE]')
          const valueWithUnescapedSglQuotesReplacedToDoubleQuotes = valueWithTempReplacedEscapedSglQuotes.replace(/'/gm, '"')
          const valueAsValidJson = valueWithUnescapedSglQuotesReplacedToDoubleQuotes.replace(/\[SGLQUOTE\]/gm, '\'')
          const javascriptExpression = JSON.parse(valueAsValidJson)
          attributes[key] = javascriptExpression
        }
      })
    }
    /* HTML5 valid tags */
    if (tag === 'a') return children ? <a {...attributes}>{children}</a> : <a {...attributes} />
    else if (tag === 'abbr') return children ? <abbr {...attributes}>{children}</abbr> : <abbr {...attributes} />
    else if (tag === 'address') return children ? <address {...attributes}>{children}</address> : <address {...attributes} />
    else if (tag === 'area') return children ? <area {...attributes}>{children}</area> : <area {...attributes} />
    else if (tag === 'article') return children ? <article {...attributes}>{children}</article> : <article {...attributes} />
    else if (tag === 'aside') return children ? <aside {...attributes}>{children}</aside> : <aside {...attributes} />
    else if (tag === 'audio') return children ? <audio {...attributes}>{children}</audio> : <audio {...attributes} />
    else if (tag === 'b') return children ? <b {...attributes}>{children}</b> : <b {...attributes} />
    else if (tag === 'base') return children ? <base {...attributes}>{children}</base> : <base {...attributes} />
    else if (tag === 'bdi') return children ? <bdi {...attributes}>{children}</bdi> : <bdi {...attributes} />
    else if (tag === 'bdo') return children ? <bdo {...attributes}>{children}</bdo> : <bdo {...attributes} />
    else if (tag === 'blockquote') return children ? <blockquote {...attributes}>{children}</blockquote> : <blockquote {...attributes} />
    else if (tag === 'body') return children ? <body {...attributes}>{children}</body> : <body {...attributes} />
    else if (tag === 'br') return children ? <br {...attributes}>{children}</br> : <br {...attributes} />
    else if (tag === 'button') return children ? <button {...attributes}>{children}</button> : <button {...attributes} />
    else if (tag === 'canvas') return children ? <canvas {...attributes}>{children}</canvas> : <canvas {...attributes} />
    else if (tag === 'caption') return children ? <caption {...attributes}>{children}</caption> : <caption {...attributes} />
    else if (tag === 'cite') return children ? <cite {...attributes}>{children}</cite> : <cite {...attributes} />
    else if (tag === 'code') return children ? <code {...attributes}>{children}</code> : <code {...attributes} />
    else if (tag === 'col') return children ? <col {...attributes}>{children}</col> : <col {...attributes} />
    else if (tag === 'colgroup') return children ? <colgroup {...attributes}>{children}</colgroup> : <colgroup {...attributes} />
    else if (tag === 'data') return children ? <data {...attributes}>{children}</data> : <data {...attributes} />
    else if (tag === 'datalist') return children ? <datalist {...attributes}>{children}</datalist> : <datalist {...attributes} />
    else if (tag === 'dd') return children ? <dd {...attributes}>{children}</dd> : <dd {...attributes} />
    else if (tag === 'del') return children ? <del {...attributes}>{children}</del> : <del {...attributes} />
    else if (tag === 'details') return children ? <details {...attributes}>{children}</details> : <details {...attributes} />
    else if (tag === 'dfn') return children ? <dfn {...attributes}>{children}</dfn> : <dfn {...attributes} />
    else if (tag === 'dialog') return children ? <dialog {...attributes}>{children}</dialog> : <dialog {...attributes} />
    else if (tag === 'div') return children ? <div {...attributes}>{children}</div> : <div {...attributes} />
    else if (tag === 'dl') return children ? <dl {...attributes}>{children}</dl> : <dl {...attributes} />
    else if (tag === 'dt') return children ? <dt {...attributes}>{children}</dt> : <dt {...attributes} />
    else if (tag === 'em') return children ? <em {...attributes}>{children}</em> : <em {...attributes} />
    else if (tag === 'embed') return children ? <embed {...attributes}>{children}</embed> : <embed {...attributes} />
    else if (tag === 'fieldset') return children ? <fieldset {...attributes}>{children}</fieldset> : <fieldset {...attributes} />
    else if (tag === 'figcaption') return children ? <figcaption {...attributes}>{children}</figcaption> : <figcaption {...attributes} />
    else if (tag === 'figure') return children ? <figure {...attributes}>{children}</figure> : <figure {...attributes} />
    else if (tag === 'footer') return children ? <footer {...attributes}>{children}</footer> : <footer {...attributes} />
    else if (tag === 'form') return children ? <form {...attributes}>{children}</form> : <form {...attributes} />
    else if (tag === 'h1') return children ? <h1 {...attributes}>{children}</h1> : <h1 {...attributes} />
    else if (tag === 'h2') return children ? <h2 {...attributes}>{children}</h2> : <h2 {...attributes} />
    else if (tag === 'h3') return children ? <h3 {...attributes}>{children}</h3> : <h3 {...attributes} />
    else if (tag === 'h4') return children ? <h4 {...attributes}>{children}</h4> : <h4 {...attributes} />
    else if (tag === 'h5') return children ? <h5 {...attributes}>{children}</h5> : <h5 {...attributes} />
    else if (tag === 'h6') return children ? <h6 {...attributes}>{children}</h6> : <h6 {...attributes} />
    else if (tag === 'head') return children ? <head {...attributes}>{children}</head> : <head {...attributes} />
    else if (tag === 'header') return children ? <header {...attributes}>{children}</header> : <header {...attributes} />
    else if (tag === 'hr') return children ? <hr {...attributes}>{children}</hr> : <hr {...attributes} />
    else if (tag === 'html') return children ? <html {...attributes}>{children}</html> : <html {...attributes} />
    else if (tag === 'i') return children ? <i {...attributes}>{children}</i> : <i {...attributes} />
    else if (tag === 'iframe') return children ? <iframe {...attributes}>{children}</iframe> : <iframe {...attributes} />
    else if (tag === 'img') return children ? <img {...attributes}>{children}</img> : <img {...attributes} />
    else if (tag === 'input') return children ? <input {...attributes}>{children}</input> : <input {...attributes} />
    else if (tag === 'ins') return children ? <ins {...attributes}>{children}</ins> : <ins {...attributes} />
    else if (tag === 'kbd') return children ? <kbd {...attributes}>{children}</kbd> : <kbd {...attributes} />
    else if (tag === 'label') return children ? <label {...attributes}>{children}</label> : <label {...attributes} />
    else if (tag === 'legend') return children ? <legend {...attributes}>{children}</legend> : <legend {...attributes} />
    else if (tag === 'li') return children ? <li {...attributes}>{children}</li> : <li {...attributes} />
    else if (tag === 'link') return children ? <link {...attributes}>{children}</link> : <link {...attributes} />
    else if (tag === 'main') return children ? <main {...attributes}>{children}</main> : <main {...attributes} />
    else if (tag === 'map') return children ? <map {...attributes}>{children}</map> : <map {...attributes} />
    else if (tag === 'mark') return children ? <mark {...attributes}>{children}</mark> : <mark {...attributes} />
    else if (tag === 'meta') return children ? <meta {...attributes}>{children}</meta> : <meta {...attributes} />
    else if (tag === 'meter') return children ? <meter {...attributes}>{children}</meter> : <meter {...attributes} />
    else if (tag === 'nav') return children ? <nav {...attributes}>{children}</nav> : <nav {...attributes} />
    else if (tag === 'noscript') return children ? <noscript {...attributes}>{children}</noscript> : <noscript {...attributes} />
    else if (tag === 'object') return children ? <object {...attributes}>{children}</object> : <object {...attributes} />
    else if (tag === 'ol') return children ? <ol {...attributes}>{children}</ol> : <ol {...attributes} />
    else if (tag === 'optgroup') return children ? <optgroup {...attributes}>{children}</optgroup> : <optgroup {...attributes} />
    else if (tag === 'option') return children ? <option {...attributes}>{children}</option> : <option {...attributes} />
    else if (tag === 'output') return children ? <output {...attributes}>{children}</output> : <output {...attributes} />
    else if (tag === 'p') return children ? <p {...attributes}>{children}</p> : <p {...attributes} />
    else if (tag === 'param') return children ? <param {...attributes}>{children}</param> : <param {...attributes} />
    else if (tag === 'picture') return children ? <picture {...attributes}>{children}</picture> : <picture {...attributes} />
    else if (tag === 'pre') return children ? <pre {...attributes}>{children}</pre> : <pre {...attributes} />
    else if (tag === 'progress') return children ? <progress {...attributes}>{children}</progress> : <progress {...attributes} />
    else if (tag === 'q') return children ? <q {...attributes}>{children}</q> : <q {...attributes} />
    else if (tag === 'rp') return children ? <rp {...attributes}>{children}</rp> : <rp {...attributes} />
    else if (tag === 'rt') return children ? <rt {...attributes}>{children}</rt> : <rt {...attributes} />
    else if (tag === 'ruby') return children ? <ruby {...attributes}>{children}</ruby> : <ruby {...attributes} />
    else if (tag === 's') return children ? <s {...attributes}>{children}</s> : <s {...attributes} />
    else if (tag === 'samp') return children ? <samp {...attributes}>{children}</samp> : <samp {...attributes} />
    else if (tag === 'script') return children ? <script {...attributes}>{children}</script> : <script {...attributes} />
    else if (tag === 'section') return children ? <section {...attributes}>{children}</section> : <section {...attributes} />
    else if (tag === 'select') return children ? <select {...attributes}>{children}</select> : <select {...attributes} />
    else if (tag === 'small') return children ? <small {...attributes}>{children}</small> : <small {...attributes} />
    else if (tag === 'source') return children ? <source {...attributes}>{children}</source> : <source {...attributes} />
    else if (tag === 'span') return children ? <span {...attributes}>{children}</span> : <span {...attributes} />
    else if (tag === 'strong') return children ? <strong {...attributes}>{children}</strong> : <strong {...attributes} />
    else if (tag === 'style') return children ? <style {...attributes}>{children}</style> : <style {...attributes} />
    else if (tag === 'sub') return children ? <sub {...attributes}>{children}</sub> : <sub {...attributes} />
    else if (tag === 'summary') return children ? <summary {...attributes}>{children}</summary> : <summary {...attributes} />
    else if (tag === 'sup') return children ? <sup {...attributes}>{children}</sup> : <sup {...attributes} />
    else if (tag === 'table') return children ? <table {...attributes}>{children}</table> : <table {...attributes} />
    else if (tag === 'tbody') return children ? <tbody {...attributes}>{children}</tbody> : <tbody {...attributes} />
    else if (tag === 'td') return children ? <td {...attributes}>{children}</td> : <td {...attributes} />
    else if (tag === 'template') return children ? <template {...attributes}>{children}</template> : <template {...attributes} />
    else if (tag === 'textarea') return children ? <textarea {...attributes}>{children}</textarea> : <textarea {...attributes} />
    else if (tag === 'tfoot') return children ? <tfoot {...attributes}>{children}</tfoot> : <tfoot {...attributes} />
    else if (tag === 'th') return children ? <th {...attributes}>{children}</th> : <th {...attributes} />
    else if (tag === 'thead') return children ? <thead {...attributes}>{children}</thead> : <thead {...attributes} />
    else if (tag === 'time') return children ? <time {...attributes}>{children}</time> : <time {...attributes} />
    else if (tag === 'title') return children ? <title {...attributes}>{children}</title> : <title {...attributes} />
    else if (tag === 'tr') return children ? <tr {...attributes}>{children}</tr> : <tr {...attributes} />
    else if (tag === 'track') return children ? <track {...attributes}>{children}</track> : <track {...attributes} />
    else if (tag === 'u') return children ? <u {...attributes}>{children}</u> : <u {...attributes} />
    else if (tag === 'ul') return children ? <ul {...attributes}>{children}</ul> : <ul {...attributes} />
    else if (tag === 'var') return children ? <var {...attributes}>{children}</var> : <var {...attributes} />
    else if (tag === 'video') return children ? <video {...attributes}>{children}</video> : <video {...attributes} />
    else if (tag === 'wbr') return children ? <wbr {...attributes}>{children}</wbr> : <wbr {...attributes} />
    /* Discontinued support in HTML5 */
    else if (tag === 'acronym') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'applet') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'basefont') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'big') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'center') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'dir') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'font') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'frame') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'frameset') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'noframes') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'strike') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    } else if (tag === 'tt') {
      console.warn(`Warning : use of <${tag}> is deprecated in HTML5`)
      return ''
    /* SVG valid tags */
    } else if (tag === 'svg') return children ? <svg {...attributes}>{children}</svg> : <svg {...attributes} />
    else if (tag === 'rect') return children ? <rect {...attributes}>{children}</rect> : <rect {...attributes} />
    else if (tag === 'circle') return children ? <circle {...attributes}>{children}</circle> : <circle {...attributes} />
    else if (tag === 'ellipse') return children ? <ellipse {...attributes}>{children}</ellipse> : <ellipse {...attributes} />
    else if (tag === 'line') return children ? <line {...attributes}>{children}</line> : <line {...attributes} />
    else if (tag === 'polyline') return children ? <polyline {...attributes}>{children}</polyline> : <polyline {...attributes} />
    else if (tag === 'polygon') return children ? <polygon {...attributes}>{children}</polygon> : <polygon {...attributes} />
    else if (tag === 'path') return children ? <path {...attributes}>{children}</path> : <path {...attributes} />
    /* Libe Components tags */
    else if (tag === 'articlemeta') return children ? <ArticleMeta {...attributes}>{children}</ArticleMeta> : <ArticleMeta {...attributes} />
    else if (tag === 'bottomnotes') return children ? <BottomNotes {...attributes}>{children}</BottomNotes> : <BottomNotes {...attributes} />
    else if (tag === 'copyvalue') return children ? <CopyValue {...attributes}>{children}</CopyValue> : <CopyValue {...attributes} />
    else if (tag === 'hero') return children ? <Hero {...attributes}>{children}</Hero> : <Hero {...attributes} />
    else if (tag === 'libelabologo') return children ? <LibeLaboLogo {...attributes}>{children}</LibeLaboLogo> : <LibeLaboLogo {...attributes} />
    else if (tag === 'loader') return children ? <Loader {...attributes}>{children}</Loader> : <Loader {...attributes} />
    else if (tag === 'loadingerror') return children ? <LoadingError {...attributes}>{children}</LoadingError> : <LoadingError {...attributes} />
    else if (tag === 'logoglyph') return children ? <LogoGlyph {...attributes}>{children}</LogoGlyph> : <LogoGlyph {...attributes} />
    else if (tag === 'photo') return children ? <Photo {...attributes}>{children}</Photo> : <Photo {...attributes} />
    else if (tag === 'libevideo') return children ? <Video {...attributes}>{children}</Video> : <Video {...attributes} />
    else if (tag === 'rastermap') return children ? <RasterMap {...attributes}>{children}</RasterMap> : <RasterMap {...attributes} />
    else if (tag === 'readalso') return children ? <ReadAlso {...attributes}>{children}</ReadAlso> : <ReadAlso {...attributes} />
    else if (tag === 'sharearticle') return children ? <ShareArticle {...attributes}>{children}</ShareArticle> : <ShareArticle {...attributes} />
    else if (tag === 'tweet') return children ? <Tweet {...attributes}>{children}</Tweet> : <Tweet {...attributes} />
    else if (tag === 'grid') return children ? <Grid {...attributes}>{children}</Grid> : <Grid {...attributes} />
    else if (tag === 'slot') return children ? <Slot {...attributes}>{children}</Slot> : <Slot {...attributes} />
    else if (tag === 'libearticle') return children ? <Article {...attributes}>{children}</Article> : <Article {...attributes} />
    else if (tag === 'heading') return children ? <Heading {...attributes}>{children}</Heading> : <Heading {...attributes} />
    else if (tag === 'libesvg') return children ? <Svg {...attributes}>{children}</Svg> : <Svg {...attributes} />
    else if (tag === 'annotation') return children ? <Annotation {...attributes}>{children}</Annotation> : <Annotation {...attributes} />
    else if (tag === 'annotationtitle') return children ? <AnnotationTitle {...attributes}>{children}</AnnotationTitle> : <AnnotationTitle {...attributes} />
    else if (tag === 'blocktitle') return children ? <BlockTitle {...attributes}>{children}</BlockTitle> : <BlockTitle {...attributes} />
    else if (tag === 'hat') return children ? <Hat {...attributes}>{children}</Hat> : <Hat {...attributes} />
    else if (tag === 'intertitle') return children ? <InterTitle {...attributes}>{children}</InterTitle> : <InterTitle {...attributes} />
    else if (tag === 'overhead') return children ? <Overhead {...attributes}>{children}</Overhead> : <Overhead {...attributes} />
    else if (tag === 'pagetitle') return children ? <PageTitle {...attributes}>{children}</PageTitle> : <PageTitle {...attributes} />
    else if (tag === 'paragraph') return children ? <Paragraph {...attributes}>{children}</Paragraph> : <Paragraph {...attributes} />
    else if (tag === 'quote') return children ? <Quote {...attributes}>{children}</Quote> : <Quote {...attributes} />
    else if (tag === 'paragraphtitle') return children ? <ParagraphTitle {...attributes}>{children}</ParagraphTitle> : <ParagraphTitle {...attributes} />
    else if (tag === 'sectiontitle') return children ? <SectionTitle {...attributes}>{children}</SectionTitle> : <SectionTitle {...attributes} />
    else if (tag === 'slug') return children ? <Slug {...attributes}>{children}</Slug> : <Slug {...attributes} />
    /* Unrecognized tag */
    else { console.warn(`Unrecognized tag: ${tag}`); return '' }
  }
}
