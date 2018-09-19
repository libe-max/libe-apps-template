(function () {
  const $ = query => document.querySelector(query)
  const $$ = query => document.querySelectorAll(query)

  /*
   *
   *  Share article
   *
   */
  shareArticle = {}
  shareArticle.facebookShare = function (e) {
      const artUrl = $('meta[property="og:url"]').getAttribute('content')
      const fbUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + artUrl
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
  shareArticle.activate = function () {
    const $$block = $$('.share-article')
    const $$facebook = $$('.share-article__facebook')
    const $$twitter = $$('.share-article__twitter')
    const $$print = $$('.share-article__print')
    const $$mail = $$('.share-article__mail')
    $$facebook.forEach(elt => elt.addEventListener('click', shareArticle.facebookShare))
    $$twitter.forEach(elt => elt.addEventListener('click', shareArticle.twitterShare))
    $$mail.forEach(elt => elt.addEventListener('click', shareArticle.mailShare))
    $$print.forEach(elt => elt.addEventListener('click', shareArticle.printShare))
  }
  shareArticle.activate()
})()
