const {cssResolve} = require('../config/replacer')
// Correct the css results extracted by the webpack-theme-color-replacer plugin
function resolveCss(output, srcArr) {
  let regExps = []
  // Extract all regular configurations in resolve configuration
  Object.keys(cssResolve).forEach(key => {
    let isRegExp = false
    let reg = {}
    try {
      reg = eval(key)
      isRegExp = reg instanceof RegExp
    } catch (e) {
      isRegExp = false
    }
    if (isRegExp) {
      regExps.push([reg, cssResolve[key]])
    }
  })

  // deduplication
  srcArr = dropDuplicate(srcArr)

  // handle css
  let outArr = []
  srcArr.forEach(text => {
    // Convert to css object
    let cssObj = parseCssObj(text)
    // According to the selector matching configuration, if the match is successful, the configuration will be processed css
    if (cssResolve[cssObj.selector] != undefined) {
      let cfg = cssResolve[cssObj.selector]
      if (cfg) {
        outArr.push(cfg.resolve(text, cssObj))
      }
    } else {
      let cssText =''
      // If the match is unsuccessful, test whether there is a matching regular configuration, and if there is a matching regular configuration, it will be processed according to the corresponding regular configuration
      for (let regExp of regExps) {
        if (regExp[0].test(cssObj.selector)) {
          let cssCfg = regExp[1]
          cssText = cssCfg? cssCfg.resolve(text, cssObj):''
          break
        }
        // If the regularity is not matched, set cssText as the default css (that is, do not process)
        cssText = text
      }
      if (cssText !='') {
        outArr.push(cssText)
      }
    }
  })
  output = outArr.join('\n')
  return output
}

// Array deduplication
function dropDuplicate(arr) {
  let map = {}
  let r = []
  for (let s of arr) {
    if (!map[s]) {
      r.push(s)
      map[s] = 1
    }
  }
  return r
}

/**
 * Parse css object from string
 * @param cssText
 * @returns {{
 * name: String,
 * rules: Array[String],
 * toText: function
 * }}
 */
function parseCssObj(cssText) {
  let css = {}
  const ruleIndex = cssText.indexOf('{')
  css.selector = cssText.substring(0, ruleIndex)
  const ruleBody = cssText.substring(ruleIndex + 1, cssText.length-1)
  const rules = ruleBody.split(';')
  css.rules = rules
  css.toText = function () {
    let body =''
    this.rules.forEach(item => {body += item +';'})
    return `${this.selector}{${body}}`
  }
  return css
}

module.exports = {resolveCss}