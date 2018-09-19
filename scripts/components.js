(function () {
  const libeSharedVanillaComponents = {}
  const lsvc = libeSharedVanillaComponents
  const $$ = query => document.querySelector(query)

  /*
   *
   *  Share article
   *
   */
  lsvc.shareArticle = {}
  lsvc.shareArticle.facebookShare = function (e) {
      const artUrl = $$('meta[property="og:url"]').getAttribute('content')
      const fbUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + artUrl
      const features = 'width=575,height=400,menubar=no,toolbar=no'
      window.open(fbUrl, '', features)
    }
  lsvc.shareArticle.twitterShare = function (e) {
    const txt = $$('meta[name="custom:tweet-text"]').getAttribute('content')
    const url = $$('meta[name="twitter:url"]').getAttribute('content')
    const via = $$('meta[name="custom:tweet-via"]').getAttribute('content')
    const tweet = `${txt} ${url} via ${via}`
    const twtUrl = `https://twitter.com/intent/tweet?original_referer=&text=${tweet}`
    const features = 'width=575,height=400,menubar=no,toolbar=no'
    window.open(twtUrl, '', features)
  }
  lsvc.shareArticle.mailShare = function (e) {
    const title = $$('meta[property="og:title"').getAttribute('content')
    const description = $$('meta[property="og:description"]').getAttribute('content')
    const url = $$('meta[property="og:url"]').getAttribute('content')
    const subject = 'Lu sur Libération.fr'
    const newLine = '%0D%0A%0D%0A'
    const txt = 'Retrouvez cet article sur le site de Libération :%0D%0A'
    const body = `${title}${newLine}${description}${newLine}${txt}${url}`
    const href = `mailto:?subject=${subject}&body=${body}`
    window.location.href = href
  }
  lsvc.shareArticle.printShare = function (e) {
    window.print()
  }
  lsvc.shareArticle.activate = function () {
    const $$block = $$('.share-article')
    const $$facebook = $$('.share-article__facebook')
    const $$twitter = $$('.share-article__twitter')
    const $$print = $$('.share-article__print')
    const $$mail = $$('.share-article__mail')
    $$facebook.addEventListener('click', lsvc.shareArticle.facebookShare)
    $$twitter.addEventListener('click', lsvc.shareArticle.twitterShare)
    $$mail.addEventListener('click', lsvc.shareArticle.mailShare)
    $$print.addEventListener('click', lsvc.shareArticle.printShare)
  }
  lsvc.shareArticle.activate()
})()
