import { Controller } from "@hotwired/stimulus"

const DEFAULT_ANIMATION_TIMEOUT = 1000

const ANIMATIONS = [
  'bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'backInDown', 'backInLeft', 'backInRight', 'backInUp', 'backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedInRight', 'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
]

export default class AnimationController extends Controller {
  static values = {
    speed: { type: String, default: 'default' },
  }

  // Animation methods are register dynamically on below the class
  //
  // heartBeat({ params: { target } }) {
  //   this._animate(target, 'heartbeat')
  // }

  _animate(target, animation) {
    document.querySelectorAll(target).forEach(element => {
      this.#animateElement(element, animation)
    })
  }

  #animateElement(element, animation) {
    const cssClassList = ["animate__animated", `animate__${animation}`, `animate__${this.speedValue}`]

    element.classList.add(...cssClassList)

    function handleAnimationEnd() {
      element.classList.remove(...cssClassList)
      element.removeEventListener('animationend', handleAnimationEnd)
    }

    element.addEventListener('animationend', handleAnimationEnd)
  }
}

ANIMATIONS.forEach(animation => {
  AnimationController.prototype[animation] = function({ params: { target } }) {
    this._animate(target, animation)
  }
})
