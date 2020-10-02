import React, { Component } from 'react'
import { statics_url as staticsUrl } from '../../../config'

import ArticleMeta from '../../blocks/ArticleMeta'
import BottomNotes from '../../blocks/BottomNotes'
import CopyValue from '../../blocks/CopyValue'
import Hero from '../../blocks/Hero'
import LibeLaboLogo from '../../blocks/LibeLaboLogo'
import Loader from '../../blocks/Loader'
import LoadingError from '../../blocks/LoadingError'
import LogoGlyph from '../../blocks/LogoGlyph'
import Photo from '../../blocks/Photo'
import Photo2 from '../../blocks/Photo2'
import RasterMap from '../../blocks/RasterMap'
import ReadAlso from '../../blocks/ReadAlso'
import ShareArticle from '../../blocks/ShareArticle'
import Tweet from '../../blocks/Tweet'
import TweetMedias from '../../blocks/TweetMedias'
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

const SECTION = props => <div style={{
  fontFamily: 'Arial',
  fontSize: '22px',
  lineHeight: '24px',
  fontWeight: '800',
  color: '#444',
  backgroundColor: '#CCC',
  marginTop: '2rem',
  marginBottom: '1rem',
  padding: '.5rem',
  borderTop: '1px solid black',
  position: 'sticky',
  top: '65px',
  zIndex: '200'
}}>
  {props.children}
</div>
const COMPONENT_BLOCK = props => <div style={{
  fontFamily: 'Arial',
  fontSize: '16px',
  fontWeight: '800',
  color: '#777',
  backgroundColor: '#FAFAFA',
  marginTop: '2rem',
  marginBottom: '1rem',
  padding: '.5rem',
  borderTop: '1px solid black',
  position: 'sticky',
  top: '106px',
  zIndex: '200'
}}>
  {props.children}
</div>

export default class DemoPage extends Component {
  constructor () {
    super()
  }

  render () {
    return <div style={{ margin: '0 1rem' }}>

      <SECTION>Icons</SECTION>
      <COMPONENT_BLOCK>down-arrow-head-icon_24</COMPONENT_BLOCK>
      <div className='lblb-demo-page__svg-section'>
        <Svg src={`${staticsUrl}/assets/down-arrow-head-icon_24.svg`} />
        
        <COMPONENT_BLOCK>left-arrow-head-icon_24</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/left-arrow-head-icon_24.svg`} />
        
        <COMPONENT_BLOCK>right-arrow-head-icon_24</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/right-arrow-head-icon_24.svg`} />
        
        <COMPONENT_BLOCK>tilted-cross-icon_24</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/tilted-cross-icon_24.svg`} />
        
        <COMPONENT_BLOCK>up-arrow-head-icon_24</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/up-arrow-head-icon_24.svg`} />
        
        <COMPONENT_BLOCK>e-mail-icon_32</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/e-mail-icon_32.svg`} />
        
        <COMPONENT_BLOCK>facebook-logo-icon_32</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/facebook-logo-icon_32.svg`} />
        
        <COMPONENT_BLOCK>printer-icon_32</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/printer-icon_32.svg`} />
        
        <COMPONENT_BLOCK>twitter-logo-icon_32</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/twitter-logo-icon_32.svg`} />
        
        <COMPONENT_BLOCK>left-arrow-head-icon_40</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/left-arrow-head-icon_40.svg`} />
        
        <COMPONENT_BLOCK>right-arrow-head-icon_40</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/right-arrow-head-icon_40.svg`} />
        
        <COMPONENT_BLOCK>tilted-cross-icon_40</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/tilted-cross-icon_40.svg`} />
        
        <COMPONENT_BLOCK>expand-arrows-icon_40</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/expand-arrows-icon_40.svg`} />
        
        <COMPONENT_BLOCK>magnifying-glass-icon_24</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/magnifying-glass-icon_24.svg`} />
        
        <COMPONENT_BLOCK>magnifying-glass-icon_32</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/magnifying-glass-icon_32.svg`} />
        
        <COMPONENT_BLOCK>magnifying-glass-icon_40</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/magnifying-glass-icon_40.svg`} />
        
        <COMPONENT_BLOCK>magnifying-glass-icon_64</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/magnifying-glass-icon_64.svg`} />
        
        <COMPONENT_BLOCK>loader-icon_64</COMPONENT_BLOCK>
        <Svg src={`${staticsUrl}/assets/loader-icon_64.svg`} />
      </div>

      <SECTION>Blocks</SECTION>
      <COMPONENT_BLOCK>ArticleMeta</COMPONENT_BLOCK>
      <ArticleMeta
        className='custom-classname'
        publishedOn='01/05/1990 11:48'
        updatedOn='11/09/2020 20:00'
        inline
        authors={[
          { name: 'Méxémé', role: 'Tech', link: 'www.lol.com' },
          { name: 'Clarou', role: 'Infogs', link: 'www.lol.com' },
          { name: 'Chri-Chrou', role: 'Design', link: 'www.lol.com' }
        ]} />

      <COMPONENT_BLOCK>BottomNotes</COMPONENT_BLOCK>
      <BottomNotes
        className='custom-classname'
        activeNote={1}
        notes={[
          { id: 0, text: 'Une note' },
          { id: 1, text: 'Une autre note' }
        ]} />

      <COMPONENT_BLOCK>CopyValue</COMPONENT_BLOCK>
      <CopyValue
        className='custom-classname'
        value='Un super lien'
        label='Copie ce super lien !'
        successLabel="C'EST COPIÉ !" />
      
      <COMPONENT_BLOCK>Hero</COMPONENT_BLOCK>
      <Hero
        className='custom-classname'
        height='600px'
        bgColor='aliceblue'
        textPosition='100 0'>
        <Paragraph>Texte d'un Hero block</Paragraph>
      </Hero>
      
      <COMPONENT_BLOCK>LibeLaboLogo</COMPONENT_BLOCK>
      <LibeLaboLogo className='custom-classname' />
          
      <COMPONENT_BLOCK>Loader</COMPONENT_BLOCK>
      <Loader className='custom-classname' />
            
      <COMPONENT_BLOCK>LoadingError</COMPONENT_BLOCK>
      <LoadingError className='custom-classname' />
            
      <COMPONENT_BLOCK>LogoGlyph</COMPONENT_BLOCK>
      <LogoGlyph className='custom-classname' />
            
      <COMPONENT_BLOCK>Photo</COMPONENT_BLOCK>
      <Photo
        className='custom-classname'
        description='Une bien belle image ma foi !'
        credits='But does it float'
        expandable
        src='https://freight.cargo.site/t/original/i/42a812c5b2617e847bb94ed05842abd1772f27b36b170cf8bc5b99583f87a4f8/richard-baily-turbulence_o.jpg' />
      
      <COMPONENT_BLOCK>Photo2</COMPONENT_BLOCK>
      <Photo2
        className='custom-classname'
        description='Photo 2 Une bien belle image ma foi !'
        credit='But does it float'
        expandable
        src='https://freight.cargo.site/w/358/q/94/i/8f64dcc173f313e01f56500c7efbf2c87f3794864272e2d19dfa29a4c2566411/hepler_4_o.jpg' />

      <Photo2
        className='custom-classname'
        description='Photo 3 Une bien belle image ma foi !'
        credit='Internet'
        expandable
        src='https://apod.nasa.gov/apod/image/1305/ngc6960_FinalPugh.jpg' />
      
      <COMPONENT_BLOCK>RasterMap</COMPONENT_BLOCK>
      <RasterMap
        className='custom-classname'
        style={{ width: '60%', height: '400px' }}
        center={[43.708498, 20]}
        zoom={8}
        tilesUrl={`https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png`}
        tilesAttribution={'<a href="#">maps.stamen.com</a> • Terrain map'}
        tilesOpacity={.8}
        tilesZIndex={1}
        animate={false}
        doubleClickZoom={false}
        dragging={true}
        keyboard={true}
        maxBounds={[[40, 14], [46, 26]]}
        onViewportChange={e => e}
        onViewportChanged={e => e}
        touchZoom={true} />
      
      <COMPONENT_BLOCK>ReadAlso</COMPONENT_BLOCK>
      <ReadAlso
        className='custom-classname'
        title='Un lien à lire aussi'
        url='#' />
      
      <COMPONENT_BLOCK>ShareArticle</COMPONENT_BLOCK>
      <ShareArticle
        className='custom-classname'
        short
        iconsOnly
        url='http://lien.com'
        tweet='Le texte du tweet' />
      
      <COMPONENT_BLOCK>Tweet</COMPONENT_BLOCK>
      <Tweet
        style={{ maxWidth: '40rem' }}
        className='custom-classname'
        small
        literary
        url='https://twitter.com/stupidites/status/1308694766511685632' />
      
      <COMPONENT_BLOCK>TweetMedias</COMPONENT_BLOCK>
      <TweetMedias
        style={{ maxWidth: '40rem' }}
        className='custom-classname'
        data={[{"id":1308361527620235300,"id_str":"1308361527620235269","indices":[281,304],"media_url":"http://pbs.twimg.com/ext_tw_video_thumb/1308361527620235269/pu/img/CHCTiLTvUpe3hsS4.jpg","media_url_https":"https://pbs.twimg.com/ext_tw_video_thumb/1308361527620235269/pu/img/CHCTiLTvUpe3hsS4.jpg","url":"https://t.co/nAsTLHTu6i","display_url":"pic.twitter.com/nAsTLHTu6i","expanded_url":"https://twitter.com/FerghaneA/status/1308361863218987011/video/1","type":"video","sizes":{"thumb":{"w":150,"h":150,"resize":"crop"},"medium":{"w":960,"h":540,"resize":"fit"},"small":{"w":680,"h":383,"resize":"fit"},"large":{"w":960,"h":540,"resize":"fit"}},"video_info":{"aspect_ratio":[16,9],"duration_millis":136480,"variants":[{"bitrate":832000,"content_type":"video/mp4","url":"https://video.twimg.com/ext_tw_video/1308361527620235269/pu/vid/640x360/xA9rFKhRukQBz_Ol.mp4?tag=10"},{"content_type":"application/x-mpegURL","url":"https://video.twimg.com/ext_tw_video/1308361527620235269/pu/pl/pAEXZxHFfQp5W9CI.m3u8?tag=10"},{"bitrate":2176000,"content_type":"video/mp4","url":"https://video.twimg.com/ext_tw_video/1308361527620235269/pu/vid/960x540/rBbUzqi4IFEL0mMM.mp4?tag=10"},{"bitrate":256000,"content_type":"video/mp4","url":"https://video.twimg.com/ext_tw_video/1308361527620235269/pu/vid/480x270/-UL1LWMkuX4O-Z4x.mp4?tag=10"}]},"additional_media_info":{"monetizable":false}}]} />
      
      <COMPONENT_BLOCK>Video</COMPONENT_BLOCK>
      <Video
        ratio={9/12}
        src='https://www.youtube.com/watch?v=JeOrBXEhOSA' />
      
      <SECTION>Layouts</SECTION>
      <COMPONENT_BLOCK>Article</COMPONENT_BLOCK>
      <Article className='custom-classname'>
        <Paragraph>This is an Article [WIP]</Paragraph>
      </Article>
      
      <COMPONENT_BLOCK>Grid & Slot</COMPONENT_BLOCK>
      <Grid
        className='custom-classname'
        width={12}
        gutterSize='.5rem'
        noSideGutter
        showGrid>
        <Slot 
          className='custom-classname'
          style={{ background: 'rgba(0, 0, 255, .5)', height: '200px' }}
          width={4}
          offset={2}>
          <Paragraph small literary>Slot 1 (width: 4, offset: 2)</Paragraph>
        </Slot>
        <Slot 
          className='custom-classname'
          style={{ background: 'rgba(0, 0, 255, .5)' }}
          align='flex-end'
          width={4}
          offset={1}>
          <Paragraph small literary>Slot 2 (width: 4, offset: 1, align: flex-end)</Paragraph>
        </Slot>
      </Grid>
      
      <SECTION>Logic</SECTION>
      <COMPONENT_BLOCK>JSXInterpreter</COMPONENT_BLOCK>
      <JSXInterpreter
        className='custom-classname'
        content='<p>JSX Interpreted!</p>' />
      
      <SECTION>Primitives</SECTION>
      <COMPONENT_BLOCK>Heading</COMPONENT_BLOCK>
      <Heading
        level={2}
        className='custom-classname'>
        This is a h2 Heading
      </Heading>
      
      <COMPONENT_BLOCK>Svg</COMPONENT_BLOCK>
      <Svg
        className='custom-classname'
        src={`${staticsUrl}/assets/libe-labo-logo.svg`} />
      
      <SECTION>Text levels</SECTION>
      <COMPONENT_BLOCK>Annotation</COMPONENT_BLOCK>
      <Annotation
        small
        className='custom-classname'>
        Annotation (small)
      </Annotation>
      <br />
      <Annotation
        literary
        className='custom-classname'>
        Annotation (literary)
      </Annotation>
      <br />
      <Annotation
        big
        className='custom-classname'>
        Annotation (big)
      </Annotation>
      <br />
      <Annotation
        huge
        className='custom-classname'>
        Annotation (huge)
      </Annotation>
      
      <COMPONENT_BLOCK>AnnotationTitle</COMPONENT_BLOCK>
      <AnnotationTitle
        level={6}
        small
        className='custom-classname'>
        AnnotationTitle (level 4, small)
      </AnnotationTitle>
      <AnnotationTitle
        level={6}
        className='custom-classname'>
        AnnotationTitle (level 4)
      </AnnotationTitle>
      <AnnotationTitle
        level={6}
        big
        className='custom-classname'>
        AnnotationTitle (level 4, big)
      </AnnotationTitle>
      <AnnotationTitle
        level={6}
        huge
        className='custom-classname'>
        AnnotationTitle (level 4, huge)
      </AnnotationTitle>
      
      <COMPONENT_BLOCK>BlockTitle</COMPONENT_BLOCK>
      <BlockTitle
        level={4}
        small
        className='custom-classname'>
        BlockTitle (level 3, small)
      </BlockTitle>
      <BlockTitle
        level={4}
        className='custom-classname'>
        BlockTitle (level 3)
      </BlockTitle>
      <BlockTitle
        level={4}
        big
        className='custom-classname'>
        BlockTitle (level 3, big)
      </BlockTitle>
      <BlockTitle
        level={4}
        huge
        className='custom-classname'>
        BlockTitle (level 3, huge)
      </BlockTitle>
      
      <COMPONENT_BLOCK>Hat</COMPONENT_BLOCK>
      <Hat
        small
        className='custom-classname'>
        Hat (small)
      </Hat>
      <Hat className='custom-classname'>
        Hat
      </Hat>
      <Hat
        big
        className='custom-classname'>
        Hat (big)
      </Hat>
      <Hat
        huge
        className='custom-classname'>
        Hat (huge)
      </Hat>
      
      <COMPONENT_BLOCK>InterTitle</COMPONENT_BLOCK>
      <InterTitle
        level={3}
        small
        className='custom-classname'>
        InterTitle (level 3, small)
      </InterTitle>
      <br />
      <InterTitle
        level={3}
        className='custom-classname'>
        InterTitle (level 3)
      </InterTitle>
      <br />
      <InterTitle
        level={3}
        big
        className='custom-classname'>
        InterTitle (level 3, big)
      </InterTitle>
      <br />
      <InterTitle
        level={3}
        huge
        className='custom-classname'>
        InterTitle (level 3, huge)
      </InterTitle>
      
      <COMPONENT_BLOCK>Overhead</COMPONENT_BLOCK>
      <Overhead 
        small
        className='custom-classname'>
        Overhead (small)
      </Overhead>
      <br />
      <Overhead className='custom-classname'>
        Overhead
      </Overhead>
      <br />
      <Overhead
        big
        className='custom-classname'>
        Overhead (big)
      </Overhead>
      <br />
      <Overhead
        huge
        className='custom-classname'>
        Overhead (huge)
      </Overhead>
      
      <COMPONENT_BLOCK>PageTitle</COMPONENT_BLOCK>
      <PageTitle
        small
        level={1}
        className='custom-classname'>
        PageTitle<br />(level 1, small)
      </PageTitle>
      <br />
      <br />
      <PageTitle
        level={1}
        className='custom-classname'>
        PageTitle<br />(level 1)
      </PageTitle>
      <br />
      <br />
      <PageTitle
        big
        level={1}
        className='custom-classname'>
        PageTitle<br />(level 1, big)
      </PageTitle>
      <br />
      <br />
      <PageTitle
        huge
        level={1}
        className='custom-classname'>
        PageTitle<br />(level 1, huge)
      </PageTitle>
      
      <COMPONENT_BLOCK>Paragraph</COMPONENT_BLOCK>
      <Paragraph
        small
        className='custom-classname'>
        Paragraph (small)
      </Paragraph>
      <br />
      <br />
      <Paragraph
        literary
        className='custom-classname'>
        Paragraph (literary)
      </Paragraph>
      <br />
      <br />
      <Paragraph
        big
        className='custom-classname'>
        Paragraph (big)
      </Paragraph>
      <br />
      <br />
      <Paragraph
        huge
        className='custom-classname'>
        Paragraph (huge)
      </Paragraph>
      
      <COMPONENT_BLOCK>ParagraphTitle</COMPONENT_BLOCK>
      <ParagraphTitle
        small
        level={5}
        className='custom-classname'>
        ParagraphTitle (level 5, small)
      </ParagraphTitle>
      <br />
      <ParagraphTitle
        literary
        level={5}
        className='custom-classname'>
        ParagraphTitle (level 5, literary)
      </ParagraphTitle>
      <br />
      <ParagraphTitle
        big
        level={5}
        className='custom-classname'>
        ParagraphTitle (level 5, big)
      </ParagraphTitle>
      <br />
      <ParagraphTitle
        huge
        level={5}
        className='custom-classname'>
        ParagraphTitle (level 5, huge)
      </ParagraphTitle>
      
      <COMPONENT_BLOCK>Quote</COMPONENT_BLOCK>
      <Quote
        small
        style={{ maxWidth: '40rem' }}
        author='Jean-Paul Sartre'
        className='custom-classname'>
        Quote (small).<br /><br />Nulla ac aliquet arcu, quis blandit orci. Morbi sapien risus, pulvinar quis metus eu, placerat luctus lectus. Praesent elementum felis erat, vitae condimentum erat pharetra in. Maecenas convallis vel elit vel varius. Nullam dictum vel enim eleifend pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ullamcorper nibh nunc, nec iaculis tortor bibendum sed. Etiam id porttitor velit. Cras convallis blandit enim sed blandit.
      </Quote>
      <br />
      <br />
      <Quote
        literary
        style={{ maxWidth: '40rem' }}
        author='Jean-Paul Sartre'
        className='custom-classname'>
        Quote (literary).<br /><br />Nulla ac aliquet arcu, quis blandit orci. Morbi sapien risus, pulvinar quis metus eu, placerat luctus lectus. Praesent elementum felis erat, vitae condimentum erat pharetra in. Maecenas convallis vel elit vel varius. Nullam dictum vel enim eleifend pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ullamcorper nibh nunc, nec iaculis tortor bibendum sed. Etiam id porttitor velit. Cras convallis blandit enim sed blandit.
      </Quote>
      <br />
      <br />
      <Quote
        sidebar
        style={{ maxWidth: '40rem' }}
        author='Jean-Paul Sartre'
        className='custom-classname'>
        Quote (sidebar).<br /><br />Nulla ac aliquet arcu, quis blandit orci. Morbi sapien risus, pulvinar quis metus eu, placerat luctus lectus. Praesent elementum felis erat, vitae condimentum erat pharetra in. Maecenas convallis vel elit vel varius. Nullam dictum vel enim eleifend pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ullamcorper nibh nunc, nec iaculis tortor bibendum sed. Etiam id porttitor velit. Cras convallis blandit enim sed blandit.
      </Quote>
      <br />
      <br />
      <Quote
        decoration
        style={{ maxWidth: '40rem' }}
        author='Jean-Paul Sartre'
        className='custom-classname'>
        Quote (decoration).<br /><br />Nulla ac aliquet arcu, quis blandit orci. Morbi sapien risus, pulvinar quis metus eu, placerat luctus lectus. Praesent elementum felis erat, vitae condimentum erat pharetra in. Maecenas convallis vel elit vel varius. Nullam dictum vel enim eleifend pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ullamcorper nibh nunc, nec iaculis tortor bibendum sed. Etiam id porttitor velit. Cras convallis blandit enim sed blandit.
      </Quote>
      <br />
      <br />
      <Quote
        big
        style={{ maxWidth: '40rem' }}
        author='Jean-Paul Sartre'
        className='custom-classname'>
        Quote (big).<br /><br />Nulla ac aliquet arcu, quis blandit orci. Morbi sapien risus, pulvinar quis metus eu, placerat luctus lectus. Praesent elementum felis erat, vitae condimentum erat pharetra in. Maecenas convallis vel elit vel varius. Nullam dictum vel enim eleifend pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ullamcorper nibh nunc, nec iaculis tortor bibendum sed. Etiam id porttitor velit. Cras convallis blandit enim sed blandit.
      </Quote>
      <br />
      <br />
      <Quote
        huge
        style={{ maxWidth: '40rem' }}
        author='Jean-Paul Sartre'
        className='custom-classname'>
        Quote (huge).<br /><br />Nulla ac aliquet arcu, quis blandit orci. Morbi sapien risus, pulvinar quis metus eu, placerat luctus lectus. Praesent elementum felis erat, vitae condimentum erat pharetra in. Maecenas convallis vel elit vel varius. Nullam dictum vel enim eleifend pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ullamcorper nibh nunc, nec iaculis tortor bibendum sed. Etiam id porttitor velit. Cras convallis blandit enim sed blandit.
      </Quote>
      
      <COMPONENT_BLOCK>SectionTitle</COMPONENT_BLOCK>
      <SectionTitle
        small
        level={2}
        className='custom-classname'>
        SectionTitle (level 2, small)
      </SectionTitle>
      <br />
      <SectionTitle
        level={2}
        className='custom-classname'>
        SectionTitle (level 2)
      </SectionTitle>
      <br />
      <SectionTitle
        big
        level={2}
        className='custom-classname'>
        SectionTitle (level 2, big)
      </SectionTitle>
      <br />
      <SectionTitle
        huge
        level={2}
        className='custom-classname'>
        SecctionTitle (level 2, huge)
      </SectionTitle>
      
      <COMPONENT_BLOCK>Slug</COMPONENT_BLOCK>
      <Slug
        noBg
        small
        className='custom-classname'>
        Slug (small, noBg)
      </Slug>
      <br />
      <br />
      <Slug className='custom-classname'>
        Slug
      </Slug>
      <br />
      <br />
      <Slug
        big
        className='custom-classname'>
        Slug (big)
      </Slug>
      <br />
      <br />
      <Slug
        huge
        className='custom-classname'>
        Slug (huge)
      </Slug>

    </div>
  }
}