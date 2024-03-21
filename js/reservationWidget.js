var isWidgetCreated = false;

function existsElement(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(true);
    }

    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      if (document.querySelector(selector)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: false,
      attributes: false,
    });
  });
}

async function CreateWhatsappChatWidget(
  option = {
    brandSetting: {
      autoShow: true,
      backgroundColor: '#0a6114',
      borderRadius: '25',
      brandImg: '/img/reservation-logo-square.png',
      brandImgData: null,
      brandName: 'WATI',
      brandSubTitle: '',
      ctaText: 'Rezervasyon',
      welcomeText: 'I have some questions about Wati, \ncan you help?',
      messageText: 'I’ve some questions about Wati, can you help?',
      phoneNumber: '',
    },
    chatButtonSetting: {
      backgroundColor: '#00E785',
      borderRadius: '25',
      ctaText: 'Rezervasyon',
      ctaIconWATI: true,
      marginLeft: '0',
      marginRight: '20',
      marginBottom: '20',
      position: 'right',
    },
    enabled: false,
  }
) {
  if (option.enabled == false) {
    return;
  }
  if (!option.chatButtonSetting.position) {
    option.chatButtonSetting.position = 'right';
    option.chatButtonSetting.marginBottom = '20';
    option.chatButtonSetting.marginLeft = '0';
    option.chatButtonSetting.marginRight = '20';
  }
  var css = document.createElement('STYLE');
  var defaultSvg = option.chatButtonSetting.ctaIconWATI
    ? `<svg id="wa-widget-svg" width="28" height="26" viewBox="0 0 28 26" fill="none" style="pointer-events: none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_152_73)">
          <style type="text/css">
          .st0{fill:#FFFFFF;stroke:#000000;stroke-width:0.25;stroke-miterlimit:10;}
        </style>
        <path class="st0" d="M10.6,3h2.8c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4h-2.8c-0.2,0-0.4,0.2-0.4,0.4C10.1,2.8,10.3,3,10.6,3z
          "/>
        <path class="st0" d="M11.6,2.7V4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4l0,0V2.7c0-0.2-0.2-0.4-0.4-0.4
          C11.8,2.3,11.6,2.5,11.6,2.7z"/>
        <path class="st0" d="M3.8,13.5c0.1-0.8,0.2-1.6,0.3-2.4c0.2-0.8,0.4-1.6,0.8-2.4C5.3,8,5.8,7.3,6.4,6.8c0.7-0.6,1.5-1,2.3-1.3
          c1.7-0.6,3.5-0.7,5.2-0.4c1.7,0.3,3.5,1.1,4.5,2.5c1.3,1.7,1.5,3.8,1.7,5.8c0,0.6,0.9,0.6,0.9,0c-0.1-2-0.4-4.1-1.4-5.8
          c-1-1.7-2.8-2.7-4.6-3.2C13,4,11,4,9.1,4.5C8.2,4.7,7.3,5.1,6.5,5.6C5.7,6.1,5,6.8,4.5,7.6C3.4,9.4,3.1,11.5,3,13.5
          C3,13.8,3.2,14,3.4,14S3.8,13.8,3.8,13.5L3.8,13.5z"/>
        <path class="st0" d="M7.9,13.2h8.3c0.6,0,0.6-0.9,0-0.9H7.9C7.3,12.4,7.3,13.2,7.9,13.2z"/>
        <path class="st0" d="M2,17.2c-0.2,0-0.4,0-0.5,0H1.3H1.2c-0.1,0-0.1,0,0.1,0l0.2,0.2c0.1,0.1,0,0.1,0,0c0,0,0-0.1,0-0.1
          c0-0.1,0-0.2,0-0.3c0-0.3,0.1-0.5,0.2-0.8c0.1-0.3,0.1-0.7,0.5-0.7c0.1,0,0.1,0,0.2,0h18.3c0.4,0,0.7,0,1,0c0.2,0,0.4,0.1,0.5,0.4
          c0.1,0.4,0.2,0.9,0.3,1.3c0,0.1,0.1,0.2,0.1,0.4l0.1-0.2l0,0.1l0.2-0.2c0.1-0.1,0.2,0,0.1,0c0,0-0.1,0-0.1,0h-0.8h-1.6l-4.4,0
          c-3.4,0-6.7,0-10.1,0C4.6,17.2,3.3,17.2,2,17.2c-0.6,0-0.6,0.9,0,0.9c1.6,0,3.3,0,4.9,0c2.3,0,4.6,0,6.8,0c2.1,0,4.2,0,6.2,0
          c0.7,0,1.4,0,2.1,0h0.7c0.2,0,0.5,0,0.6-0.3c0.1-0.2,0.1-0.4,0-0.7l-0.3-1.2c-0.1-0.5-0.3-0.9-0.7-1.2c-0.3-0.2-0.7-0.2-1-0.2H3.1
          c-0.3,0-0.6,0-0.9,0c-0.3,0-0.5,0.1-0.8,0.2c-0.4,0.2-0.5,0.6-0.6,1.1c-0.1,0.4-0.2,0.8-0.2,1.2c0,0.4-0.1,0.8,0.4,1
          c0.3,0.1,0.7,0,1,0C2.5,18.1,2.5,17.2,2,17.2z"/>
          </g>
          <defs>
              <clipPath id="clip0_152_73">
                  <rect width="28" height="24.1245" fill="white" transform="translate(0 0.937744)"/>
              </clipPath>
          </defs>
      </svg>`
    : `<svg id="wa-widget-svg" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none">
          <g clip-path="url(#clip0_1029_374)">
          <style type="text/css">
          .st0{fill:#FFFFFF;stroke:#000000;stroke-width:0.25;stroke-miterlimit:10;}
        </style>
        <path class="st0" d="M10.6,3h2.8c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4h-2.8c-0.2,0-0.4,0.2-0.4,0.4C10.1,2.8,10.3,3,10.6,3z
          "/>
        <path class="st0" d="M11.6,2.7V4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4l0,0V2.7c0-0.2-0.2-0.4-0.4-0.4
          C11.8,2.3,11.6,2.5,11.6,2.7z"/>
        <path class="st0" d="M3.8,13.5c0.1-0.8,0.2-1.6,0.3-2.4c0.2-0.8,0.4-1.6,0.8-2.4C5.3,8,5.8,7.3,6.4,6.8c0.7-0.6,1.5-1,2.3-1.3
          c1.7-0.6,3.5-0.7,5.2-0.4c1.7,0.3,3.5,1.1,4.5,2.5c1.3,1.7,1.5,3.8,1.7,5.8c0,0.6,0.9,0.6,0.9,0c-0.1-2-0.4-4.1-1.4-5.8
          c-1-1.7-2.8-2.7-4.6-3.2C13,4,11,4,9.1,4.5C8.2,4.7,7.3,5.1,6.5,5.6C5.7,6.1,5,6.8,4.5,7.6C3.4,9.4,3.1,11.5,3,13.5
          C3,13.8,3.2,14,3.4,14S3.8,13.8,3.8,13.5L3.8,13.5z"/>
        <path class="st0" d="M7.9,13.2h8.3c0.6,0,0.6-0.9,0-0.9H7.9C7.3,12.4,7.3,13.2,7.9,13.2z"/>
        <path class="st0" d="M2,17.2c-0.2,0-0.4,0-0.5,0H1.3H1.2c-0.1,0-0.1,0,0.1,0l0.2,0.2c0.1,0.1,0,0.1,0,0c0,0,0-0.1,0-0.1
          c0-0.1,0-0.2,0-0.3c0-0.3,0.1-0.5,0.2-0.8c0.1-0.3,0.1-0.7,0.5-0.7c0.1,0,0.1,0,0.2,0h18.3c0.4,0,0.7,0,1,0c0.2,0,0.4,0.1,0.5,0.4
          c0.1,0.4,0.2,0.9,0.3,1.3c0,0.1,0.1,0.2,0.1,0.4l0.1-0.2l0,0.1l0.2-0.2c0.1-0.1,0.2,0,0.1,0c0,0-0.1,0-0.1,0h-0.8h-1.6l-4.4,0
          c-3.4,0-6.7,0-10.1,0C4.6,17.2,3.3,17.2,2,17.2c-0.6,0-0.6,0.9,0,0.9c1.6,0,3.3,0,4.9,0c2.3,0,4.6,0,6.8,0c2.1,0,4.2,0,6.2,0
          c0.7,0,1.4,0,2.1,0h0.7c0.2,0,0.5,0,0.6-0.3c0.1-0.2,0.1-0.4,0-0.7l-0.3-1.2c-0.1-0.5-0.3-0.9-0.7-1.2c-0.3-0.2-0.7-0.2-1-0.2H3.1
          c-0.3,0-0.6,0-0.9,0c-0.3,0-0.5,0.1-0.8,0.2c-0.4,0.2-0.5,0.6-0.6,1.1c-0.1,0.4-0.2,0.8-0.2,1.2c0,0.4-0.1,0.8,0.4,1
          c0.3,0.1,0.7,0,1,0C2.5,18.1,2.5,17.2,2,17.2z"/>
          </g>
          <defs>
              <clipPath id="clip0_1029_374">
                  <rect width="27.8453" height="28" fill="white" />
              </clipPath>
          </defs>
      </svg>`;

  const widgetExists = await existsElement('#whatsapp-chat-widget');
  if (!widgetExists && !isWidgetCreated) {
    isWidgetCreated = true;
    initWidget();
  }
  
  function initWidget() {
    if (option.brandSetting.messageText) {
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '{{page_link}}',
        encodeURIComponent(window.location.href)
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '__page_link__',
        encodeURIComponent(window.location.href)
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '{{page_title}}',
        window.document.title
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll(
        '__page_title__',
        window.document.title
      );
      option.brandSetting.messageText = option.brandSetting.messageText.replaceAll('\n', '%0A');
    }

    document.body.insertAdjacentHTML(
      'beforeend',
      `<div id="whatsapp-chat-widget">
                <div class="wa-widget-send-button">
                    ${defaultSvg}
                    <svg id="wa-widget-opened-svg" width="23" height="13" viewBox="0 0 23 13" fill="none" style="pointer-events: none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.20001 1.7334L11.6154 11.1488L21.0308 1.7334" stroke="#363636" stroke-width="2" stroke-linecap="square"/>
                    </svg>
                </div>
            </div>`
    );
    document.querySelector('#whatsapp-chat-widget')?.insertAdjacentHTML(
      'beforeend',
      `<div class='wa-chat-bubble'>
                <div class="wa-chat-bubble-close-button">
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" style="pointer-events: none; display: block;"
                     xmlns="http://www.w3.org/2000/svg">
                     <path d="M3.6001 4.1001L8.4001 8.9001M3.6001 8.9001L8.4001 4.1001" stroke="white" stroke-width="1.33333"/>
                    </svg>
                </div>
                 <div class="wa-chat-bubble-text">
                     ${option.chatButtonSetting.ctaText}
                </div>
            </div>`
    );
    document.querySelector('#whatsapp-chat-widget')?.insertAdjacentHTML(
      'beforeend',
      `<div class='wa-chat-box'>
                 <img class='wa-chat-box-brand'
                    onError='this.src= "../img/reservation-logo-square.png";' 
                    src='${option.brandSetting.brandImg}'
                    alt=''/> 
    
                 <div class='wa-chat-box-content-chat-welcome'>
                      ${option.brandSetting.welcomeText.replace(/\n/g, '<br/>')}
                 </div>
    
                 <a
                    role="button"
                    target="_blank"
                    href="http://uzungol-yayla-otel.hmshotel.net/${option.brandSetting.phoneNumber.replace(
        /\+/g,
        ''
      )}${option.brandSetting.messageText ? option.brandSetting.messageText : ''
      }"
                    title="Rezervasyon" class="wa-chat-box-content-send-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block">
                        <path class="st0" d="M10.6,3h2.8c0.2,0,0.4-0.2,0.4-0.4c0-0.2-0.2-0.4-0.4-0.4h-2.8c-0.2,0-0.4,0.2-0.4,0.4C10.1,2.8,10.3,3,10.6,3z
                        "/>
                      <path class="st0" d="M11.6,2.7V4c0,0.2,0.2,0.4,0.4,0.4c0.2,0,0.4-0.2,0.4-0.4l0,0V2.7c0-0.2-0.2-0.4-0.4-0.4
                        C11.8,2.3,11.6,2.5,11.6,2.7z"/>
                      <path class="st0" d="M3.8,13.5c0.1-0.8,0.2-1.6,0.3-2.4c0.2-0.8,0.4-1.6,0.8-2.4C5.3,8,5.8,7.3,6.4,6.8c0.7-0.6,1.5-1,2.3-1.3
                        c1.7-0.6,3.5-0.7,5.2-0.4c1.7,0.3,3.5,1.1,4.5,2.5c1.3,1.7,1.5,3.8,1.7,5.8c0,0.6,0.9,0.6,0.9,0c-0.1-2-0.4-4.1-1.4-5.8
                        c-1-1.7-2.8-2.7-4.6-3.2C13,4,11,4,9.1,4.5C8.2,4.7,7.3,5.1,6.5,5.6C5.7,6.1,5,6.8,4.5,7.6C3.4,9.4,3.1,11.5,3,13.5
                        C3,13.8,3.2,14,3.4,14S3.8,13.8,3.8,13.5L3.8,13.5z"/>
                      <path class="st0" d="M7.9,13.2h8.3c0.6,0,0.6-0.9,0-0.9H7.9C7.3,12.4,7.3,13.2,7.9,13.2z"/>
                      <path class="st0" d="M2,17.2c-0.2,0-0.4,0-0.5,0H1.3H1.2c-0.1,0-0.1,0,0.1,0l0.2,0.2c0.1,0.1,0,0.1,0,0c0,0,0-0.1,0-0.1
                        c0-0.1,0-0.2,0-0.3c0-0.3,0.1-0.5,0.2-0.8c0.1-0.3,0.1-0.7,0.5-0.7c0.1,0,0.1,0,0.2,0h18.3c0.4,0,0.7,0,1,0c0.2,0,0.4,0.1,0.5,0.4
                        c0.1,0.4,0.2,0.9,0.3,1.3c0,0.1,0.1,0.2,0.1,0.4l0.1-0.2l0,0.1l0.2-0.2c0.1-0.1,0.2,0,0.1,0c0,0-0.1,0-0.1,0h-0.8h-1.6l-4.4,0
                        c-3.4,0-6.7,0-10.1,0C4.6,17.2,3.3,17.2,2,17.2c-0.6,0-0.6,0.9,0,0.9c1.6,0,3.3,0,4.9,0c2.3,0,4.6,0,6.8,0c2.1,0,4.2,0,6.2,0
                        c0.7,0,1.4,0,2.1,0h0.7c0.2,0,0.5,0,0.6-0.3c0.1-0.2,0.1-0.4,0-0.7l-0.3-1.2c-0.1-0.5-0.3-0.9-0.7-1.2c-0.3-0.2-0.7-0.2-1-0.2H3.1
                        c-0.3,0-0.6,0-0.9,0c-0.3,0-0.5,0.1-0.8,0.2c-0.4,0.2-0.5,0.6-0.6,1.1c-0.1,0.4-0.2,0.8-0.2,1.2c0,0.4-0.1,0.8,0.4,1
                        c0.3,0.1,0.7,0,1,0C2.5,18.1,2.5,17.2,2,17.2z"/>
                        </svg>
                        <span class="wa-chat-box-content-send-btn-text">${option.brandSetting.ctaText
      }</span>
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: auto; display: block;">
                          <path d="M1 1L7 7L1 13" stroke="white" stroke-width="2" stroke-linecap="round" />
                        </svg>
                  </a>
              
    
                <div class='wa-chat-box-poweredby'>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block">
                      <path d="M3 15V9H0L5 0V6H8L3 15Z" fill="#999999" />
                    </svg>
                    Powered by <a href="https://uzungol.net" target="_blank" class="wa-chat-box-poweredby-link">Uzungol</a>
                </div>
            </div>
            `
    );
    if (option.brandSetting.autoShow) {
      document.querySelector('.wa-chat-box').classList.add('wa-chat-box-visible');
      document.querySelector('#wa-widget-svg').style.display = 'none';
      document.querySelector('#wa-widget-opened-svg').style.display = 'block';
      document.querySelector('.wa-chat-bubble').style.display = 'none';
      document
        .querySelector('.wa-widget-send-button')
        .classList.add('wa-widget-send-button-clicked');
    } else {
      document.querySelector('.wa-chat-box').classList.remove('wa-chat-box-visible');
      document.querySelector('#wa-widget-svg').style.display = 'block';
      document.querySelector('#wa-widget-opened-svg').style.display = 'none';
      document.querySelector('.wa-chat-bubble').style.cssText = '';
    }
    document.querySelector('#whatsapp-chat-widget').addEventListener('click', function (event) {
      console.log('event', event);
      if (
        event.target.classList.contains('wa-widget-send-button') &&
        event.target.classList.contains('wa-widget-send-button-clicked')
      ) {
        document.querySelector('.wa-chat-box').classList.remove('wa-chat-box-visible');
        document.querySelector('#wa-widget-svg').style.display = 'block';
        document.querySelector('#wa-widget-opened-svg').style.display = 'none';
        document.querySelector('.wa-chat-bubble').style.cssText = '';
        document.querySelector('.wa-widget-send-button').className = 'wa-widget-send-button';
      } else if (
        (event.target.classList.contains('wa-widget-send-button') &&
          !event.target.classList.contains('wa-widget-send-button-clicked')) ||
        event.target.classList.contains('wa-chat-bubble-text')
      ) {
        document.querySelector('.wa-chat-box').classList.add('wa-chat-box-visible');
        document.querySelector('#wa-widget-svg').style.display = 'none';
        document.querySelector('#wa-widget-opened-svg').style.display = 'block';
        document.querySelector('.wa-chat-bubble').style.display = 'none';
        document
          .querySelector('.wa-widget-send-button')
          .classList.add('wa-widget-send-button-clicked');
      }
      if (event.target.classList.contains('wa-chat-bubble-close-button')) {
        document.querySelector('.wa-chat-bubble').classList.add('wa-chat-bubble-closed');
      }
    });
    window.onload = function () {
      setTimeout(function () {
        document.querySelector('.wa-chat-box').classList.add('wa-chat-box-transition');
      }, 100);
    };

  }

  var styles = `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400&display=swap');
  
          #whatsapp-chat-widget{
              display: ${option.enabled ? 'block' : 'none'}
          }
          .wa-chat-box-content-send-btn-text{
              font-family: 'Outfit', sans-serif !important;
              font-weight: 500;
              font-size: 16px;
              line-height: 20px;
              color: #FFFFFF !important;
          }
          .wa-chat-box-content-send-btn{
              background-color: #1D1D1B !important;
              box-shadow: 4px 4px 0px ${option.chatButtonSetting.backgroundColor};
              border-radius: 8px;
              text-decoration: none;
              cursor: pointer;
              position: relative;
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 16px 20px;

              border-width: initial;
              border-style: none;
              border-color: initial;
              border-image: initial;
              overflow: hidden;
              opacity: 1 !important;
          }
          .wa-chat-box-content-chat-welcome{        
              font-family: 'Outfit', sans-serif !important;
              font-size: 20px;
              line-height: 150%;
              color: #000000;
          }
          .wa-chat-box-brand{
              width: 52px;
              height: 52px;
              border: 1px solid #363636;
              box-shadow: 0px 2px 240px rgba(0, 0, 0, 0.04);
              border-radius: 100px;
              background-color: ${option.chatButtonSetting.backgroundColor};
          }
          .wa-chat-box{
              background-color: white;
              z-index: 16000160 !important;
              margin-bottom: 106px;
              margin-bottom: 92px;
              min-width: 320px;
              position: fixed !important;
              bottom: ${option.chatButtonSetting.marginBottom}px !important;
              ${option.chatButtonSetting.position == 'left'
      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
    };
              border-radius: 32px;
              border: 2px solid #363636;
              box-shadow: 4px 6px 0px ${option.chatButtonSetting.backgroundColor};
              padding: 32px 32px 16px;
              min-height: 279px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 12px;

              pointer-events: none;
              opacity: 0;
              scale: 0;
              transform-origin: ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'
    } bottom;
              
          }
          .wa-chat-box-visible{
              pointer-events: auto;
              opacity: 1;
              scale: 1;
          }
          .wa-chat-box-transition {
              transition: scale 150ms ease-in, opacity 250ms ease-in;
          }
          .wa-widget-send-button {
              margin: 0 0 ${option.chatButtonSetting.marginBottom}px 0 !important;      
              position: fixed !important;
              z-index: 16000160 !important;
              bottom: 0 !important;
              text-align: center !important;
              height: 52px;
              min-width: 52px;
              border: ${option.chatButtonSetting.ctaIconWATI ? '1px' : '0'} solid #363636;
              border-radius: 100px;
              visibility: visible;
              transition: none !important;
              background-color: ${option.chatButtonSetting.backgroundColor};
              box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.4);
              ${option.chatButtonSetting.position == 'left'
      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
    };
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .wa-widget-send-button-clicked {
            border: 1px solid #363636;
          }
          .wa-chat-box-poweredby{
              margin-left: auto;
              margin-right: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 3px;
              font-family: 'Outfit', sans-serif !important;
              font-size: 12px;
              line-height: 18px;
              color: #999999;
          }
          .wa-chat-box-poweredby-link{
              font-weight: 600;
              color: #666666 !important;
              text-decoration: none !important;
          }
          .wa-chat-box-poweredby-link::hover{
              color: #666666 !important;
              text-decoration: none !important;
          }
  
          .wa-chat-bubble{
              display: ${option.chatButtonSetting.ctaText ? 'flex' : 'none'};
              align-items: center;
              gap: 8px;
              z-index: 16000160 !important;
              position: fixed !important;
              margin-bottom: 63px;
              bottom: ${option.chatButtonSetting.marginBottom}px !important;
              ${option.chatButtonSetting.position == 'left'
      ? 'left : ' + option.chatButtonSetting.marginLeft + 'px'
      : 'right : ' + option.chatButtonSetting.marginRight + 'px'
    };
          }
          .wa-chat-bubble-closed{
            display: none;
          }
          .wa-chat-bubble-close-button{
              height: 20px;
              min-width: 20px;
              background: #000000;
              border-radius: 24px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              order: ${option.chatButtonSetting.position == 'left' ? '0' : '1'};
          }
          .wa-chat-bubble-text{
             font-family: 'Outfit', sans-serif !important;
             background: #FFFFFF;
             border: 1px solid #363636;
             box-shadow: 2px 3px 0px ${option.chatButtonSetting.backgroundColor};
             border-radius: 24px;
             padding: 8px 16px;
  
             font-weight: 500;
             font-size: 14px;
             line-height: 150%;
             color: #202020;
             cursor: pointer;
          }
          .wa-chat-box::before {
             content: '';
             position: absolute;
             top: 100%;
             ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'}: 29px;
             width: 0;
             height: 0;
             border-width: 0 0px 30px 30px;
             border-color: transparent transparent white transparent;
             border-style: solid;
             transform: rotate(${option.chatButtonSetting.position == 'left' ? '180' : '270'}deg);
             z-index: 1;
          }
          .wa-chat-box::after {
             content: '';
             position: absolute;
             top: 100%;
             ${option.chatButtonSetting.position == 'left' ? 'left' : 'right'}: 27px;
             width: 0;
             height: 0;
             border-width: 0px 0px 34px 34px;
             border-color: transparent transparent black transparent;
             border-style: solid;
             border-radius: 2px;
             filter: drop-shadow(${option.chatButtonSetting.position == 'left' ? '-5px -2px 0px' : '-2px 5px 0px'
    } ${option.chatButtonSetting.backgroundColor});
             transform: rotate(${option.chatButtonSetting.position == 'left' ? '180' : '270'}deg);
          }
  
          @media only screen and (max-width: 600px) {
              .wa-chat-box
              {
                  width: auto;
                  position: fixed !important;
                  right: 20px!important;
                  left: 20px!important;
              }
          }
      `;

  var styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.getElementsByTagName('head')[0].appendChild(styleSheet);
}
