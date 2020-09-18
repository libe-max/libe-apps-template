import React, { Component } from 'react'

import ArticleMeta from '../../blocks/ArticleMeta'
import BottomNotes from '../../blocks/BottomNotes'
import CopyValue from '../../blocks/CopyValue'
import Hero from '../../blocks/Hero'
import LibeLaboLogo from '../../blocks/LibeLaboLogo'
import Loader from '../../blocks/Loader'
import LoadingError from '../../blocks/LoadingError'
import LogoGlyph from '../../blocks/LogoGlyph'
import Photo from '../../blocks/Photo'
import RasterMap from '../../blocks/RasterMap'
import ReadAlso from '../../blocks/ReadAlso'
import ShareArticle from '../../blocks/ShareArticle'
import Tweet from '../../blocks/Tweet'
import Video from '../../blocks/Video'

import Article from '../../layouts/Article'
import Grid from '../../layouts/Grid'
import Slot from '../../layouts/Slot'

import JSXInterpreter from '../../logic/JSXInterpreter'

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
import Quote from '../../text-levels/Quote'
import SectionTitle from '../../text-levels/SectionTitle'
import Slug from '../../text-levels/Slug'

export default class DemoPage extends Component {
  constructor () {
    super()
  }

  render () {
    return <div>
      <ArticleMeta authors={[
        { name: 'Méxémé', role: 'Techos', link: 'www.lol.com' },
        { name: 'Clarou', role: 'Graphos', link: 'www.lol.com' },
        { name: 'Chri-Chrou', role: 'Designos', link: 'www.lol.com' }
      ]} publishedOn='01/05/1990 11:48' updatedOn='11/09/2020 20:00' inline />

      <BottomNotes notes={[
        { id: 0, text: 'Coucou coco !' },
        { id: 1, text: 'Coucou cocotte !' }
      ]} activeNote={1} />

      <CopyValue
        value='Un super lien'
        label='Copie ce super lien mon ami !'
        successLabel="C'EST COPIÉ MA GRANDE COUILLE!" />

      <Hero height='600px' bgColor='blue' textPosition='100 0'>
        <Paragraph>Coucou le contenu !</Paragraph>
      </Hero>

      <LibeLaboLogo />
      
      <Loader />
      
      <LoadingError />
      
      <LogoGlyph />
      
      <Photo
        description='Une bien belle image ma foi !'
        credits='But does it float'
        expandable
        src='https://freight.cargo.site/t/original/i/42a812c5b2617e847bb94ed05842abd1772f27b36b170cf8bc5b99583f87a4f8/richard-baily-turbulence_o.jpg' />

      <RasterMap
        center={[50, 2]}
        zoom={14}
        tilesUrl
        tilesAttribution
        tilesOpacity
        tilesZIndex
        animate
        bounds
        doublcClickZoom
        dragging
        keyboard
        maxBounds
        onViewportChange
        onViewportChanged
        touchZoom
        viewport />
      <ReadAlso />
      <ShareArticle />
      <Tweet />
      <Video src='https://www.youtube.com/watch?v=JeOrBXEhOSA' ratio={19/9} />
      <Article />
      <Grid
        width={12}
        gutterSize='.5rem'
        noSideGutter
        showGrid>
        <Slot width={4} offset={4}>KIKOO</Slot>
      </Grid>
      <JSXInterpreter content='<p>JSX Interpreted!</p>' />
      <Heading />
      <Svg />
      <Annotation />
      <AnnotationTitle />
      <BlockTitle />
      <Hat />
      <InterTitle />
      <Overhead />
      <PageTitle />
      <Paragraph />
      <ParagraphTitle />
      <Quote />
      <SectionTitle />
      <Slug />
    </div>
  }
}