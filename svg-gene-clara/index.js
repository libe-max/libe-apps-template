const fs = require('fs')
const path = require('path')
const { convert } = require('convert-svg-to-png')
// const [width, height] = [3129 - 2, 1889 - 2]

// const newLines = new Array(100000).fill(null).map(e => {
//   const posX = Math.random() * width
//   const posY = Math.random() * height
//   return `<rect fill="#000000" x="${posX}" y="${posY}" width="2" height="2"></rect>`
// }).join('')
// const outputData = fileHead + newLines + fileFoot
// const outputFile = path.join(__dirname, `output-${Date.now()}.svg`)
// fs.writeFileSync(outputFile, outputData)

const data = [{
  month: 1,
  month_name: '',
  total: 213,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 0 },
    { name: 'Italie', short_name: 'ITA', deaths: 0 },
    { name: 'Espagne', short_name: 'ESP', deaths: 0 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 0 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 0  },
    { name: 'Russie', short_name: 'RUS', deaths: 0  },
    { name: 'Chine', short_name: 'CHN', deaths: 213 },
    { name: 'Mexique', short_name: 'MEX', deaths: 0 },
    { name: 'Brésil', short_name: 'BRE', deaths: 0 },
    { name: 'Pérou', short_name: 'PER', deaths: 0 },
    { name: 'Colombie', short_name: 'COL', deaths: 0 },
    { name: 'Inde', short_name: 'IND', deaths: 0 },
    { name: 'Iran', short_name: 'IRA', deaths: 0 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 0 }
  ]
}, {
  month: 2,
  month_name: '',
  total: 2942,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 2 },
    { name: 'Italie', short_name: 'ITA', deaths: 29 },
    { name: 'Espagne', short_name: 'ESP', deaths: 1 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 0 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 0  },
    { name: 'Russie', short_name: 'RUS', deaths: 0  },
    { name: 'Chine', short_name: 'CHN', deaths: 2838 },
    { name: 'Mexique', short_name: 'MEX', deaths: 0 },
    { name: 'Brésil', short_name: 'BRE', deaths: 0 },
    { name: 'Pérou', short_name: 'PER', deaths: 0 },
    { name: 'Colombie', short_name: 'COL', deaths: 0 },
    { name: 'Inde', short_name: 'IND', deaths: 0 },
    { name: 'Iran', short_name: 'IRA', deaths: 43 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 29 }
  ]
}, {
  month: 3,
  month_name: 'Janvier,<br />Février & Mars',
  total: 37842,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 3015 },
    { name: 'Italie', short_name: 'ITA', deaths: 11562 },
    { name: 'Espagne', short_name: 'ESP', deaths: 10045 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 2050 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 2398  },
    { name: 'Russie', short_name: 'RUS', deaths: 9  },
    { name: 'Chine', short_name: 'CHN', deaths: 476},
    { name: 'Mexique', short_name: 'MEX', deaths: 20 },
    { name: 'Brésil', short_name: 'BRE', deaths: 136 },
    { name: 'Pérou', short_name: 'PER', deaths: 11 },
    { name: 'Colombie', short_name: 'COL', deaths: 10 },
    { name: 'Inde', short_name: 'IND', deaths: 32 },
    { name: 'Iran', short_name: 'IRA', deaths: 2855 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 5223 }
  ]
}, {
  month: 4,
  month_name: 'Avril',
  total: 183727,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 21037 },
    { name: 'Italie', short_name: 'ITA', deaths: 16091 },
    { name: 'Espagne', short_name: 'ESP', deaths: 14971 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 23999 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 55332 },
    { name: 'Russie', short_name: 'RUS', deaths: 1064 },
    { name: 'Chine', short_name: 'CHN', deaths: 1329},
    { name: 'Mexique', short_name: 'MEX', deaths: 1549 },
    { name: 'Brésil', short_name: 'BRE', deaths: 4881 },
    { name: 'Pérou', short_name: 'PER', deaths: 843 },
    { name: 'Colombie', short_name: 'COL', deaths: 259 },
    { name: 'Inde', short_name: 'IND', deaths: 1042 },
    { name: 'Iran', short_name: 'IRA', deaths: 3130 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 38200 }
  ]
}, {
  month: 5,
  month_name: 'Mai',
  total: 141773,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 4663 },
    { name: 'Italie', short_name: 'ITA', deaths: 5658 },
    { name: 'Espagne', short_name: 'ESP', deaths: 2946 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 11336 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 44910 },
    { name: 'Russie', short_name: 'RUS', deaths: 3620 },
    { name: 'Chine', short_name: 'CHN', deaths: 2},
    { name: 'Mexique', short_name: 'MEX', deaths: 7846 },
    { name: 'Brésil', short_name: 'BRE', deaths: 22861 },
    { name: 'Pérou', short_name: 'PER', deaths: 3376 },
    { name: 'Colombie', short_name: 'COL', deaths: 584 },
    { name: 'Inde', short_name: 'IND', deaths: 4090 },
    { name: 'Iran', short_name: 'IRA', deaths: 1706 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 28175 }
  ]
}, {
  month: 6,
  month_name: 'Juin',
  total: 134365,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 1013 },
    { name: 'Italie', short_name: 'ITA', deaths: 1404 },
    { name: 'Espagne', short_name: 'ESP', deaths: 388 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 2956 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 23563 },
    { name: 'Russie', short_name: 'RUS', deaths: 4627 },
    { name: 'Chine', short_name: 'CHN', deaths: 3},
    { name: 'Mexique', short_name: 'MEX', deaths: 17233 },
    { name: 'Brésil', short_name: 'BRE', deaths: 29744 },
    { name: 'Pérou', short_name: 'PER', deaths: 5087 },
    { name: 'Colombie', short_name: 'COL', deaths: 2253 },
    { name: 'Inde', short_name: 'IND', deaths: 11729 },
    { name: 'Iran', short_name: 'IRA', deaths: 2936 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 31429 }
  ]
}, {
  month: 7,
  month_name: 'Juillet',
  total: 162946,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 406 },
    { name: 'Italie', short_name: 'ITA', deaths: 388 },
    { name: 'Espagne', short_name: 'ESP', deaths: 103 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 828 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 23851 },
    { name: 'Russie', short_name: 'RUS', deaths: 4643 },
    { name: 'Chine', short_name: 'CHN', deaths: 18},
    { name: 'Mexique', short_name: 'MEX', deaths: 18713 },
    { name: 'Brésil', short_name: 'BRE', deaths: 32512 },
    { name: 'Pérou', short_name: 'PER', deaths: 9499 },
    { name: 'Colombie', short_name: 'COL', deaths: 6348 },
    { name: 'Inde', short_name: 'IND', deaths: 18854 },
    { name: 'Iran', short_name: 'IRA', deaths: 5899 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 40884 }
  ]
}, {
  month: 8,
  month_name: 'Août',
  total: 181040,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 331 },
    { name: 'Italie', short_name: 'ITA', deaths: 345 },
    { name: 'Espagne', short_name: 'ESP', deaths: 817 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 330 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 31635 },
    { name: 'Russie', short_name: 'RUS', deaths: 3213 },
    { name: 'Chine', short_name: 'CHN', deaths: 63},
    { name: 'Mexique', short_name: 'MEX', deaths: 18458 },
    { name: 'Brésil', short_name: 'BRE', deaths: 30328 },
    { name: 'Pérou', short_name: 'PER', deaths: 9791 },
    { name: 'Colombie', short_name: 'COL', deaths: 9610 },
    { name: 'Inde', short_name: 'IND', deaths: 28722 },
    { name: 'Iran', short_name: 'IRA', deaths: 4893 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 42504 }
  ]
}, {
  month: 9,
  month_name: 'Septembre',
  total: 146589,
  detail: [
    { name: 'France', short_name: 'FRA', deaths: 806 },
    { name: 'Italie', short_name: 'ITA', deaths: 281 },
    { name: 'Espagne', short_name: 'ESP', deaths: 1763 },
    { name: 'Royaume-Uni', short_name: 'UK', deaths: 363 },
    { name: 'Etats-Unis', short_name: 'USA', deaths: 19036 },
    { name: 'Russie', short_name: 'RUS', deaths: 3148 },
    { name: 'Chine', short_name: 'CHN', deaths: 17},
    { name: 'Mexique', short_name: 'MEX', deaths: 11130 },
    { name: 'Brésil', short_name: 'BRE', deaths: 18515 },
    { name: 'Pérou', short_name: 'PER', deaths: 3263 },
    { name: 'Colombie', short_name: 'COL', deaths: 6039 },
    { name: 'Inde', short_name: 'IND', deaths: 30034 },
    { name: 'Iran', short_name: 'IRA', deaths: 3932 },
    { name: 'Autres pays', short_name: 'Autres', deaths: 48262 }
  ]
}]

async function doTheJob () {
  let total = 0
  data.forEach(month => { total += month.total })
  const totalWidth = 1200
  const totalHeightLg = totalWidth
  const totalHeightMd = totalWidth * 1.8
  const totalHeightSm = totalWidth * 3

  data.map(async month => {
    const heightPercent = month.total / total
    const [heightLg, heightMd, heightSm] = [heightPercent * totalHeightLg, heightPercent * totalHeightMd, heightPercent * totalHeightSm]
    month.detail.map(async country => {
      const widthPercent = country.deaths / month.total
      const width = totalWidth * widthPercent
      const sizes = [[width, heightLg, 'LG', 2, 10], [width, heightMd, 'MD', 3, 10], [width, heightSm, 'SM', 5, 50]]
      sizes.forEach(async (size) => {
        const [w, h, name, dotWidth, factor] = size
        // const dotWidth = 2
        const fileHead = `<?xml version="1.0" encoding="UTF-8"?><svg width="${Math.round(w)}px" height="${Math.round(h)}px" viewBox="0 0 ${Math.round(w)} ${Math.round(h)}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">`
        const fileFoot = `</g></svg>`
        const blackDots = new Array(Math.round(country.deaths / factor)).fill(null).map(e => {
          const [posX, posY] = [Math.random() * (w - dotWidth), Math.random() * (h - dotWidth)]
          return `<rect fill="#000000" x="${posX}" y="${posY}" width="${dotWidth}" height="${dotWidth}"></rect>`
        }).join('')
        const redDots = new Array(Math.round(country.deaths / factor)).fill(null).map(e => {
          const [posX, posY] = [Math.random() * w, Math.random() * h]
          return `<rect fill="#e91845" x="${posX}" y="${posY}" width="${dotWidth}" height="${dotWidth}"></rect>`
        }).join('')
        const outputBlackData = fileHead + blackDots + fileFoot
        const outputBlackFile = path.join(__dirname, `output/${name}-black-${month.month}-${country.short_name}-${Math.round(w)}-${Math.round(h)}.svg`)
        const outputRedData = fileHead + redDots + fileFoot
        const outputRedFile = path.join(__dirname, `output/${name}-red-${month.month}-${country.short_name}-${Math.round(w)}-${Math.round(h)}.svg`)
        fs.writeFileSync(outputBlackFile, outputBlackData)
        fs.writeFileSync(outputRedFile, outputRedData)
      })
    })
  })
}

doTheJob()




