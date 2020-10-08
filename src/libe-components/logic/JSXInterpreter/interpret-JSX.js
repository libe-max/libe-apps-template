import React from 'react'
import { html2json } from 'html2json'
import { Parser } from 'html-to-react'

import ArticleMeta from '../../blocks/ArticleMeta'
import BottomNotes from '../../blocks/BottomNotes'
import CopyValue from '../../blocks/CopyValue'
import Diaporama from '../../blocks/Diaporama'
import Hero from '../../blocks/Hero'
import LibeLaboLogo from '../../blocks/LibeLaboLogo'
import Loader from '../../blocks/Loader'
import LoadingError from '../../blocks/LoadingError'
import LogoGlyph from '../../blocks/LogoGlyph'
import Photo from '../../blocks/Photo'
import Photo2 from '../../blocks/Photo2'
import Video from '../../blocks/Video'
import Video2 from '../../blocks/Video2'
import RasterMap from '../../blocks/RasterMap'
import ReadAlso from '../../blocks/ReadAlso'
import ShareArticle from '../../blocks/ShareArticle'
import Tweet from '../../blocks/Tweet'
import TweetMedias from '../../blocks/TweetMedias'

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
    const [chl, att] = [children, attributes]
    if (tag === 'a') return chl ? <a {...att}>{chl}</a> : <a {...att} />
    else if (tag === 'abbr') return chl ? <abbr {...att}>{chl}</abbr> : <abbr {...att} />
    else if (tag === 'address') return chl ? <address {...att}>{chl}</address> : <address {...att} />
    else if (tag === 'area') return chl ? <area {...att}>{chl}</area> : <area {...att} />
    else if (tag === 'article') return chl ? <article {...att}>{chl}</article> : <article {...att} />
    else if (tag === 'aside') return chl ? <aside {...att}>{chl}</aside> : <aside {...att} />
    else if (tag === 'audio') return chl ? <audio {...att}>{chl}</audio> : <audio {...att} />
    else if (tag === 'b') return chl ? <b {...att}>{chl}</b> : <b {...att} />
    else if (tag === 'base') return chl ? <base {...att}>{chl}</base> : <base {...att} />
    else if (tag === 'bdi') return chl ? <bdi {...att}>{chl}</bdi> : <bdi {...att} />
    else if (tag === 'bdo') return chl ? <bdo {...att}>{chl}</bdo> : <bdo {...att} />
    else if (tag === 'blockquote') return chl ? <blockquote {...att}>{chl}</blockquote> : <blockquote {...att} />
    else if (tag === 'body') return chl ? <body {...att}>{chl}</body> : <body {...att} />
    else if (tag === 'br') return chl ? <br {...att}>{chl}</br> : <br {...att} />
    else if (tag === 'button') return chl ? <button {...att}>{chl}</button> : <button {...att} />
    else if (tag === 'canvas') return chl ? <canvas {...att}>{chl}</canvas> : <canvas {...att} />
    else if (tag === 'caption') return chl ? <caption {...att}>{chl}</caption> : <caption {...att} />
    else if (tag === 'cite') return chl ? <cite {...att}>{chl}</cite> : <cite {...att} />
    else if (tag === 'code') return chl ? <code {...att}>{chl}</code> : <code {...att} />
    else if (tag === 'col') return chl ? <col {...att}>{chl}</col> : <col {...att} />
    else if (tag === 'colgroup') return chl ? <colgroup {...att}>{chl}</colgroup> : <colgroup {...att} />
    else if (tag === 'data') return chl ? <data {...att}>{chl}</data> : <data {...att} />
    else if (tag === 'datalist') return chl ? <datalist {...att}>{chl}</datalist> : <datalist {...att} />
    else if (tag === 'dd') return chl ? <dd {...att}>{chl}</dd> : <dd {...att} />
    else if (tag === 'del') return chl ? <del {...att}>{chl}</del> : <del {...att} />
    else if (tag === 'details') return chl ? <details {...att}>{chl}</details> : <details {...att} />
    else if (tag === 'dfn') return chl ? <dfn {...att}>{chl}</dfn> : <dfn {...att} />
    else if (tag === 'dialog') return chl ? <dialog {...att}>{chl}</dialog> : <dialog {...att} />
    else if (tag === 'div') return chl ? <div {...att}>{chl}</div> : <div {...att} />
    else if (tag === 'dl') return chl ? <dl {...att}>{chl}</dl> : <dl {...att} />
    else if (tag === 'dt') return chl ? <dt {...att}>{chl}</dt> : <dt {...att} />
    else if (tag === 'em') return chl ? <em {...att}>{chl}</em> : <em {...att} />
    else if (tag === 'embed') return chl ? <embed {...att}>{chl}</embed> : <embed {...att} />
    else if (tag === 'fieldset') return chl ? <fieldset {...att}>{chl}</fieldset> : <fieldset {...att} />
    else if (tag === 'figcaption') return chl ? <figcaption {...att}>{chl}</figcaption> : <figcaption {...att} />
    else if (tag === 'figure') return chl ? <figure {...att}>{chl}</figure> : <figure {...att} />
    else if (tag === 'footer') return chl ? <footer {...att}>{chl}</footer> : <footer {...att} />
    else if (tag === 'form') return chl ? <form {...att}>{chl}</form> : <form {...att} />
    else if (tag === 'h1') return chl ? <h1 {...att}>{chl}</h1> : <h1 {...att} />
    else if (tag === 'h2') return chl ? <h2 {...att}>{chl}</h2> : <h2 {...att} />
    else if (tag === 'h3') return chl ? <h3 {...att}>{chl}</h3> : <h3 {...att} />
    else if (tag === 'h4') return chl ? <h4 {...att}>{chl}</h4> : <h4 {...att} />
    else if (tag === 'h5') return chl ? <h5 {...att}>{chl}</h5> : <h5 {...att} />
    else if (tag === 'h6') return chl ? <h6 {...att}>{chl}</h6> : <h6 {...att} />
    else if (tag === 'head') return chl ? <head {...att}>{chl}</head> : <head {...att} />
    else if (tag === 'header') return chl ? <header {...att}>{chl}</header> : <header {...att} />
    else if (tag === 'hr') return chl ? <hr {...att}>{chl}</hr> : <hr {...att} />
    else if (tag === 'html') return chl ? <html {...att}>{chl}</html> : <html {...att} />
    else if (tag === 'i') return chl ? <i {...att}>{chl}</i> : <i {...att} />
    else if (tag === 'iframe') return chl ? <iframe {...att}>{chl}</iframe> : <iframe {...att} />
    else if (tag === 'img') return chl ? <img {...att}>{chl}</img> : <img {...att} />
    else if (tag === 'input') return chl ? <input {...att}>{chl}</input> : <input {...att} />
    else if (tag === 'ins') return chl ? <ins {...att}>{chl}</ins> : <ins {...att} />
    else if (tag === 'kbd') return chl ? <kbd {...att}>{chl}</kbd> : <kbd {...att} />
    else if (tag === 'label') return chl ? <label {...att}>{chl}</label> : <label {...att} />
    else if (tag === 'legend') return chl ? <legend {...att}>{chl}</legend> : <legend {...att} />
    else if (tag === 'li') return chl ? <li {...att}>{chl}</li> : <li {...att} />
    else if (tag === 'link') return chl ? <link {...att}>{chl}</link> : <link {...att} />
    else if (tag === 'main') return chl ? <main {...att}>{chl}</main> : <main {...att} />
    else if (tag === 'map') return chl ? <map {...att}>{chl}</map> : <map {...att} />
    else if (tag === 'mark') return chl ? <mark {...att}>{chl}</mark> : <mark {...att} />
    else if (tag === 'meta') return chl ? <meta {...att}>{chl}</meta> : <meta {...att} />
    else if (tag === 'meter') return chl ? <meter {...att}>{chl}</meter> : <meter {...att} />
    else if (tag === 'nav') return chl ? <nav {...att}>{chl}</nav> : <nav {...att} />
    else if (tag === 'noscript') return chl ? <noscript {...att}>{chl}</noscript> : <noscript {...att} />
    else if (tag === 'object') return chl ? <object {...att}>{chl}</object> : <object {...att} />
    else if (tag === 'ol') return chl ? <ol {...att}>{chl}</ol> : <ol {...att} />
    else if (tag === 'optgroup') return chl ? <optgroup {...att}>{chl}</optgroup> : <optgroup {...att} />
    else if (tag === 'option') return chl ? <option {...att}>{chl}</option> : <option {...att} />
    else if (tag === 'output') return chl ? <output {...att}>{chl}</output> : <output {...att} />
    else if (tag === 'p') return chl ? <p {...att}>{chl}</p> : <p {...att} />
    else if (tag === 'param') return chl ? <param {...att}>{chl}</param> : <param {...att} />
    else if (tag === 'picture') return chl ? <picture {...att}>{chl}</picture> : <picture {...att} />
    else if (tag === 'pre') return chl ? <pre {...att}>{chl}</pre> : <pre {...att} />
    else if (tag === 'progress') return chl ? <progress {...att}>{chl}</progress> : <progress {...att} />
    else if (tag === 'q') return chl ? <q {...att}>{chl}</q> : <q {...att} />
    else if (tag === 'rp') return chl ? <rp {...att}>{chl}</rp> : <rp {...att} />
    else if (tag === 'rt') return chl ? <rt {...att}>{chl}</rt> : <rt {...att} />
    else if (tag === 'ruby') return chl ? <ruby {...att}>{chl}</ruby> : <ruby {...att} />
    else if (tag === 's') return chl ? <s {...att}>{chl}</s> : <s {...att} />
    else if (tag === 'samp') return chl ? <samp {...att}>{chl}</samp> : <samp {...att} />
    else if (tag === 'script') return chl ? <script {...att}>{chl}</script> : <script {...att} />
    else if (tag === 'section') return chl ? <section {...att}>{chl}</section> : <section {...att} />
    else if (tag === 'select') return chl ? <select {...att}>{chl}</select> : <select {...att} />
    else if (tag === 'small') return chl ? <small {...att}>{chl}</small> : <small {...att} />
    else if (tag === 'source') return chl ? <source {...att}>{chl}</source> : <source {...att} />
    else if (tag === 'span') return chl ? <span {...att}>{chl}</span> : <span {...att} />
    else if (tag === 'strong') return chl ? <strong {...att}>{chl}</strong> : <strong {...att} />
    else if (tag === 'style') return chl ? <style {...att}>{chl}</style> : <style {...att} />
    else if (tag === 'sub') return chl ? <sub {...att}>{chl}</sub> : <sub {...att} />
    else if (tag === 'summary') return chl ? <summary {...att}>{chl}</summary> : <summary {...att} />
    else if (tag === 'sup') return chl ? <sup {...att}>{chl}</sup> : <sup {...att} />
    else if (tag === 'table') return chl ? <table {...att}>{chl}</table> : <table {...att} />
    else if (tag === 'tbody') return chl ? <tbody {...att}>{chl}</tbody> : <tbody {...att} />
    else if (tag === 'td') return chl ? <td {...att}>{chl}</td> : <td {...att} />
    else if (tag === 'template') return chl ? <template {...att}>{chl}</template> : <template {...att} />
    else if (tag === 'textarea') return chl ? <textarea {...att}>{chl}</textarea> : <textarea {...att} />
    else if (tag === 'tfoot') return chl ? <tfoot {...att}>{chl}</tfoot> : <tfoot {...att} />
    else if (tag === 'th') return chl ? <th {...att}>{chl}</th> : <th {...att} />
    else if (tag === 'thead') return chl ? <thead {...att}>{chl}</thead> : <thead {...att} />
    else if (tag === 'time') return chl ? <time {...att}>{chl}</time> : <time {...att} />
    else if (tag === 'title') return chl ? <title {...att}>{chl}</title> : <title {...att} />
    else if (tag === 'tr') return chl ? <tr {...att}>{chl}</tr> : <tr {...att} />
    else if (tag === 'track') return chl ? <track {...att}>{chl}</track> : <track {...att} />
    else if (tag === 'u') return chl ? <u {...att}>{chl}</u> : <u {...att} />
    else if (tag === 'ul') return chl ? <ul {...att}>{chl}</ul> : <ul {...att} />
    else if (tag === 'var') return chl ? <var {...att}>{chl}</var> : <var {...att} />
    else if (tag === 'video') return chl ? <video {...att}>{chl}</video> : <video {...att} />
    else if (tag === 'wbr') return chl ? <wbr {...att}>{chl}</wbr> : <wbr {...att} />
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
    } else if (tag === 'svg') return chl ? <svg {...att}>{chl}</svg> : <svg {...att} />
    else if (tag === 'rect') return chl ? <rect {...att}>{chl}</rect> : <rect {...att} />
    else if (tag === 'circle') return chl ? <circle {...att}>{chl}</circle> : <circle {...att} />
    else if (tag === 'ellipse') return chl ? <ellipse {...att}>{chl}</ellipse> : <ellipse {...att} />
    else if (tag === 'line') return chl ? <line {...att}>{chl}</line> : <line {...att} />
    else if (tag === 'polyline') return chl ? <polyline {...att}>{chl}</polyline> : <polyline {...att} />
    else if (tag === 'polygon') return chl ? <polygon {...att}>{chl}</polygon> : <polygon {...att} />
    else if (tag === 'path') return chl ? <path {...att}>{chl}</path> : <path {...att} />
    /* Libe Components tags */
    else if (tag === 'articlemeta') return chl ? <ArticleMeta {...att}>{chl}</ArticleMeta> : <ArticleMeta {...att} />
    else if (tag === 'bottomnotes') return chl ? <BottomNotes {...att}>{chl}</BottomNotes> : <BottomNotes {...att} />
    else if (tag === 'copyvalue') return chl ? <CopyValue {...att}>{chl}</CopyValue> : <CopyValue {...att} />
    else if (tag === 'diaporama') return chl ? <Diaporama {...att}>{chl}</Diaporama> : <Diaporama {...att} />
    else if (tag === 'hero') return chl ? <Hero {...att}>{chl}</Hero> : <Hero {...att} />
    else if (tag === 'libelabologo') return chl ? <LibeLaboLogo {...att}>{chl}</LibeLaboLogo> : <LibeLaboLogo {...att} />
    else if (tag === 'loader') return chl ? <Loader {...att}>{chl}</Loader> : <Loader {...att} />
    else if (tag === 'loadingerror') return chl ? <LoadingError {...att}>{chl}</LoadingError> : <LoadingError {...att} />
    else if (tag === 'logoglyph') return chl ? <LogoGlyph {...att}>{chl}</LogoGlyph> : <LogoGlyph {...att} />
    else if (tag === 'photo') return chl ? <Photo {...att}>{chl}</Photo> : <Photo {...att} />
    else if (tag === 'photo2') return chl ? <Photo2 {...att}>{chl}</Photo2> : <Photo2 {...att} />
    else if (tag === 'libevideo') return chl ? <Video {...att}>{chl}</Video> : <Video {...att} />
    else if (tag === 'libevideo2') return chl ? <Video2 {...att}>{chl}</Video2> : <Video2 {...att} />
    else if (tag === 'rastermap') return chl ? <RasterMap {...att}>{chl}</RasterMap> : <RasterMap {...att} />
    else if (tag === 'readalso') return chl ? <ReadAlso {...att}>{chl}</ReadAlso> : <ReadAlso {...att} />
    else if (tag === 'sharearticle') return chl ? <ShareArticle {...att}>{chl}</ShareArticle> : <ShareArticle {...att} />
    else if (tag === 'tweet') return chl ? <Tweet {...att}>{chl}</Tweet> : <Tweet {...att} />
    else if (tag === 'tweetmedias') return chl ? <TweetMedias {...att}>{chl}</TweetMedias> : <TweetMedias {...att} />
    else if (tag === 'grid') return chl ? <Grid {...att}>{chl}</Grid> : <Grid {...att} />
    else if (tag === 'slot') return chl ? <Slot {...att}>{chl}</Slot> : <Slot {...att} />
    else if (tag === 'libearticle') return chl ? <Article {...att}>{chl}</Article> : <Article {...att} />
    else if (tag === 'heading') return chl ? <Heading {...att}>{chl}</Heading> : <Heading {...att} />
    else if (tag === 'libesvg') return chl ? <Svg {...att}>{chl}</Svg> : <Svg {...att} />
    else if (tag === 'annotation') return chl ? <Annotation {...att}>{chl}</Annotation> : <Annotation {...att} />
    else if (tag === 'annotationtitle') return chl ? <AnnotationTitle {...att}>{chl}</AnnotationTitle> : <AnnotationTitle {...att} />
    else if (tag === 'blocktitle') return chl ? <BlockTitle {...att}>{chl}</BlockTitle> : <BlockTitle {...att} />
    else if (tag === 'hat') return chl ? <Hat {...att}>{chl}</Hat> : <Hat {...att} />
    else if (tag === 'intertitle') return chl ? <InterTitle {...att}>{chl}</InterTitle> : <InterTitle {...att} />
    else if (tag === 'overhead') return chl ? <Overhead {...att}>{chl}</Overhead> : <Overhead {...att} />
    else if (tag === 'pagetitle') return chl ? <PageTitle {...att}>{chl}</PageTitle> : <PageTitle {...att} />
    else if (tag === 'paragraph') return chl ? <Paragraph {...att}>{chl}</Paragraph> : <Paragraph {...att} />
    else if (tag === 'quote') return chl ? <Quote {...att}>{chl}</Quote> : <Quote {...att} />
    else if (tag === 'paragraphtitle') return chl ? <ParagraphTitle {...att}>{chl}</ParagraphTitle> : <ParagraphTitle {...att} />
    else if (tag === 'sectiontitle') return chl ? <SectionTitle {...att}>{chl}</SectionTitle> : <SectionTitle {...att} />
    else if (tag === 'slug') return chl ? <Slug {...att}>{chl}</Slug> : <Slug {...att} />
    /* Unrecognized tag */
    else { console.warn(`Unrecognized tag: ${tag}`); return '' }
  }
}
