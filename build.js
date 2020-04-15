const { promisify } = require('util')
const { exec } = require('child_process')
const { readFile, writeFile } = require('fs')
const execPromise = promisify(exec)
const cheerio = require('cheerio')
const config = require('./src/config')

async function readFilePromise (path, encoding = 'utf8') {
  const result = await new Promise((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (err) resolve({ success: null, error: err })
      else resolve({ success: data, error: null })
    })
  })
  return result
}

async function writeFilePromise (path, data, encoding = 'utf8') {
  const result = await new Promise((resolve, reject) => {
    writeFile(path, data, encoding, err => {
      if (err) resolve({ success: null, error: err })
      else resolve({ success: true, error: null })
    })
  })
  return result
}

async function build () {
  // Build app
  const { stdout, stderr } = await execPromise('react-scripts build')
  if (stderr) throw Error(stderr)
  console.log(stdout)

  // Read build index.html
  console.log('Reading file at ./build/index.html')
  const { success: fileData, error: readError } = await readFilePromise('./build/index.html')
  if (readError) throw readError

  // Add meta tags
  console.log('\nAdding meta tags')
  const { title, url, description, author, image, xiti_id: xitiId } = config.meta
  const $ = cheerio.load(fileData)
  $('head').append(`
    <title>Libération.fr – ${title}</title>
    <link rel="canonical" href="${url}" />
    <meta name="author" content="${author}" />
    <meta name="description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    
    <!-- Chartbeat -->
    <script type="text/javascript">
      if (window.location.host !== 'www.liberation.fr') return
      var _sf_async_config={};
      _sf_async_config.uid = 43601;
      _sf_async_config.domain = 'liberation.fr';
      _sf_async_config.useCanonical = true;
      _sf_async_config.sections = "Static";
      _sf_async_config.authors = "Static";
      (function(){
        function loadChartbeat() {
          window._sf_endpt=(new Date()).getTime();
          var e = document.createElement('script');
          e.setAttribute('language', 'javascript');
          e.setAttribute('type', 'text/javascript');
          e.setAttribute('src', 'https://static.chartbeat.com/' + 'js/chartbeat.js');
          document.body.appendChild(e);
        }
        var oldonload = window.onload;
        window.onload = (typeof window.onload != 'function') ?
        loadChartbeat : function() { oldonload(); loadChartbeat(); };
      })();
    </script>

    <!-- Google Analytics -->
    <script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=UA-116918263-1"></script>
    <script type="text/javascript">
      if (window.location.host !== 'www.liberation.fr') return
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-116918263-1');
    </script>

    <!-- Xiti -->
    <script type="text/javascript">
      if (window.location.host !== 'www.liberation.fr') return
      xtnv = document
      xtsd = "https://logs1091"
      xtsite = "381060"
      xtn2 = "48"
      xtpage = "LibeLabo::${xitiId}"
      xtdi = ""
      xt_pagetype = "2-1-0"
      xt_multc = "&x1=0&x2=40&x3=10&x4=&x5=20200401&x6=20&x7=1783805"
      xt_ati= ""
      xt_ati_title = ""
      xt_ati_product = ""
      xt_an = "";
      xt_ac = "";
      if (window.xtparam==null) { window.xtparam = ''; }
      window.xtparam += "&ptype="+xt_pagetype+"&ac="+xt_ac+"&an="+xt_an+xt_multc+"&ati="+xt_ati;
    </script>
    <noscript>
      <img width="1" height="1" src="https://logliberation.xiti.com/hit.xiti?s=381060&amp;s2=56&amp;p=LibeLabo::${xitiId}&amp;di=&amp;" >
    </noscript>
    <script type="text/javascript" src="https://statics.liberation.fr/bloom/theme/js/xtcore.js"></script>
  `)

  // Save index.html
  console.log('\nSaving file at ./build/index.html')
  const { success, error: writeError } = await writeFilePromise('./build/index.html', $.html())
  if (writeError) throw writeError

  // Return
  console.log('\nDone.')
}

build()
  .then(res => process.exit(0))
  .catch(err => process.exit(1))
