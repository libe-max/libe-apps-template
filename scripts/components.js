(function () {
  const $ = query => document.querySelector(query)
  const $$ = query => document.querySelectorAll(query)

  /*
   *
   *  Share article
   *
   */
  shareArticle = {}
  shareArticle.DOM = `
    <div class="share-article__facebook">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
        xmlns:xlink="https://www.w3.org/1999/xlink">
        <title>Facebook</title>
        <path
          class="svg-shape"
          d="M5.7 7h1.8v-1.8000000000000003c0-.8 0-2 .6-2.8.6-.7 1.5-1.3 2.9-1.3 2.3 0 3.3.3 3.3.3l-.5 2.7s-.8-.2-1.5-.2-1.3.3-1.3 1v2.1h2.9l-.2 2.7h-2.7v9.2h-3.5v-9.2h-1.8v-2.7z"></path>
      </svg>
      <span>Partager</span>
    </div>
    <div class="share-article__twitter">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
        xmlns:xlink="https://www.w3.org/1999/xlink">
        <title>Twitter</title>
        <path
          class="svg-shape"
          d="M19.5 4.1c-.7.3-1.5.5-2.2.6.8-.5 1.4-1.2 1.7-2.2-.8.4-1.6.8-2.5.9-.7-.8-1.7-1.2-2.8-1.2-2.2 0-3.9 1.7-3.9 3.9 0 .3 0 .6.1.9-3.3-.1-6.2-1.7-8.1-4-.3.6-.5 1.2-.5 2 0 1.3.7 2.5 1.7 3.2-.6 0-1.2-.2-1.7-.5 0 1.9 1.3 3.5 3.1 3.8-.3.1-.7.1-1 .1-.3 0-.5 0-.7-.1.5 1.5 1.9 2.7 3.6 2.7-1.3 1-3 1.7-4.8 1.7-.3 0-.6 0-.9-.1 1.7 1.1 3.8 1.8 6 1.8 7.2 0 11.1-5.9 11.1-11.1v-.5c.6-.4 1.3-1.1 1.8-1.9"></path>
      </svg>
      <span>Tweeter</span>
    </div>
    <div class="share-article__print">
      <svg
        width="27"
        height="22"
        viewBox="0 0 27 22"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
        xmlns:xlink="https://www.w3.org/1999/xlink">
        <title>Print</title>
        <path
          class="svg-shape"
          d="M23 6h-19c-1.6 0-3 1.3-3 3v4c0 1.7 1.4 3 3 3h2v-5h15v5h2c1.6 0 3-1.3 3-3v-4c0-1.7-1.4-3-3-3m1 4h-2v-2h2v2zM8 0h11v5h-11zM8 22h11v-10h-11v10zm9-3h-3v-1h3v1zm-6-4h6v1h-6v-1z"></path>
      </svg>
    </div>
    <div class="share-article__mail">
      <svg
        width="20"
        height="13"
        viewBox="0 0 20 13"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
        xmlns:xlink="https://www.w3.org/1999/xlink">
        <title>Mail</title>
        <path 
          class="svg-shape"
          d="M14,7l-4,3L6,7l-6,6h20L14,7z M0,2v9l5-5L0,2z M20,11V2l-5,4L20,11z M20,0H0l10,8L20,0z"/>
      </svg>
    </div>`
  shareArticle.facebookShare = function (e) {
      const artUrl = $('meta[property="og:url"]').getAttribute('content')
      const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + artUrl
      const features = 'width=575,height=400,menubar=no,toolbar=no'
      window.open(fbUrl, '', features)
    }
  shareArticle.twitterShare = function (e) {
    const txt = $('meta[name="custom:tweet-text"]').getAttribute('content')
    const url = $('meta[name="twitter:url"]').getAttribute('content')
    const via = $('meta[name="custom:tweet-via"]').getAttribute('content')
    const tweet = `${txt} ${url} via ${via}`
    const twtUrl = `https://twitter.com/intent/tweet?original_referer=&text=${tweet}`
    const features = 'width=575,height=400,menubar=no,toolbar=no'
    window.open(twtUrl, '', features)
  }
  shareArticle.mailShare = function (e) {
    const title = $('meta[property="og:title"').getAttribute('content')
    const description = $('meta[property="og:description"]').getAttribute('content')
    const url = $('meta[property="og:url"]').getAttribute('content')
    const subject = 'Lu sur Libération.fr'
    const newLine = '%0D%0A%0D%0A'
    const txt = 'Retrouvez cet article sur le site de Libération :%0D%0A'
    const body = `${title}${newLine}${description}${newLine}${txt}${url}`
    const href = `mailto:?subject=${subject}&body=${body}`
    window.location.href = href
  }
  shareArticle.printShare = function (e) {
    window.print()
  }
  shareArticle.mount = function () {
    const $$block = $$('.share-article')
    $$block.forEach(elt => { elt.innerHTML = shareArticle.DOM })
    const $$facebook = $$('.share-article__facebook')
    const $$twitter = $$('.share-article__twitter')
    const $$print = $$('.share-article__print')
    const $$mail = $$('.share-article__mail')
    $$facebook.forEach(elt => elt.addEventListener('click', shareArticle.facebookShare))
    $$twitter.forEach(elt => elt.addEventListener('click', shareArticle.twitterShare))
    $$mail.forEach(elt => elt.addEventListener('click', shareArticle.mailShare))
    $$print.forEach(elt => elt.addEventListener('click', shareArticle.printShare))
  }
  shareArticle.mount()

  /*
   *
   *  Six plus logo
   *
   */

   sixPlusLogo = {}
   sixPlusLogo.DOM = `
    <a href="https://www.liberation.fr/data-nouveaux-formats-six-plus,100538">
      <svg
        width="447"
        height="216.9"
        viewBox="0 0 447 216.9"
        version="1.1"
        xmlns="https://www.w3.org/2000/svg"
        xmlns:xlink="https://www.w3.org/1999/xlink">
        <style type="text/css">.st0{fill:#E61E49;} .st1{fill:#1D1D1B;}</style>
        <g>
          <path
            class="st0"
            d="M262.7,206c-1.5,0-2.9-0.8-3.6-2.2c-1-2-0.2-4.4,1.8-5.4c4.3-2.2,96.9-48.5,161.4-62.6
            c-52.6-15-156.2-59.1-161.2-61.2c-2-0.9-3-3.2-2.1-5.2s3.2-3,5.2-2.1c1.4,0.6,141.9,60.4,179.3,65.2c2,0.3,3.5,2,3.5,4c0,2-1.6,3.7-3.6,3.9c-25.5,2.6-64.4,14.7-112.7,34.9c-36.6,15.3-66,30.1-66.2,30.2C263.9,205.9,263.3,206,262.7,206z"/>
          <path
            class="st0"
            d="M184.3,206c-0.6,0-1.2-0.1-1.8-0.4c-0.3-0.1-29.6-14.9-66.2-30.2C68,155.2,29,143.1,3.6,140.5c-2-0.2-3.6-1.9-3.6-3.9s1.5-3.8,3.5-4c37.4-4.8,177.8-64.6,179.3-65.2c2-0.9,4.4,0.1,5.2,2.1s-0.1,4.4-2.1,5.2c-5,2.2-108.6,46.3-161.2,61.2c64.6,14,157.1,60.4,161.4,62.6c2,1,2.8,3.4,1.8,5.4C187.2,205.2,185.8,206,184.3,206z"/>
          <g>
            <g>
              <path
                class="st0"
                d="M223.4,159.8c-2.2,0-4-1.8-4-4v-38.5c0-2.2,1.8-4,4-4s4,1.8,4,4v38.5C227.4,158,225.6,159.8,223.4,159.8z"/>
              <path
                class="st0"
                d="M242.7,140.5h-38.5c-2.2,0-4-1.8-4-4s1.8-4,4-4h38.5c2.2,0,4,1.8,4,4C246.7,138.7,244.9,140.5,242.7,140.5z"/>
            </g>
            <path
              class="st1"
              d="M223.4,216.9c-44.3,0-80.4-36-80.4-80.3s36-80.4,80.4-80.4c44.3,0,80.3,36,80.3,80.4
              C303.8,180.8,267.7,216.9,223.4,216.9zM223.4,64.2c-39.9,0-72.4,32.5-72.4,72.4s32.5,72.3,72.4,72.3s72.3-32.5,72.3-72.3C295.8,96.6,263.3,64.2,223.4,64.2z"/>
            <g>
              <path
                class="st1"
                d="M147.3,140.5c-1.8,0-3.5-1.2-3.9-3.1c-0.4-1.5-7.9-38.8,77.6-136c1.5-1.7,4-1.8,5.6-0.4c1.7,1.5,1.8,4,0.4,5.6C203,34,171.4,73.8,157.5,108c-7.7,19-6.3,27.4-6.3,27.5c0.5,2.2-0.8,4.3-3,4.8C147.9,140.5,147.6,140.5,147.3,140.5z"/>
            </g>
          </g>
        </g>
      </svg>
    </a>`
  sixPlusLogo.mount = function () {
    const $$block = $$('.sixplus-logo')
    $$block.forEach(elt => { elt.innerHTML = sixPlusLogo.DOM })  
  }
  sixPlusLogo.mount()

})()
