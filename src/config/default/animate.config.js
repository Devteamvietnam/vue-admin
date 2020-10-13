const direct_s = ['left', 'right']
const direct_1 = ['left', 'right', 'down', 'up']
const direct_1_b = ['downBig', 'upBig', 'leftBig', 'rightBig']
const direct_2 = ['topLeft', 'bottomRight', 'topRight', 'bottomLeft']
const direct_3 = ['downLeft', 'upRight', 'downRight', 'upLeft']

// animate.css
const ANIMATE = {
  preset: [
    //Preset animation configuration
    { name: 'back', alias: 'gradient', directions: direct_1 },
    { name: 'bounce', alias: 'bouncing', directions: direct_1.concat('default') },
    {
      name: 'fade',
      alias: 'dilute',
      directions: direct_1
        .concat(direct_1_b)
        .concat(direct_2)
        .concat('default')
    },
    { name: 'flip', alias: 'flip', directions: ['x', 'y'] },
    { name: 'lightSpeed', alias: 'Speed of light', directions: direct_s },
    { name: 'rotate', alias: 'rotate', directions: direct_3.concat('default') },
    { name: 'roll', alias: 'roll', directions: ['default'] },
    { name: 'zoom', alias: 'zoom', directions: direct_1.concat('default') },
    { name: 'slide', alias: 'slide', directions: direct_1 }
  ]
}
module.exports = ANIMATE
