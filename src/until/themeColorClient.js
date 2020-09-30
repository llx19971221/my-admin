import client from 'webpack-theme-color-replacer/client';
import forElementUI from 'webpack-theme-color-replacer/forElementUI';
// 动态切换主题色
export function changeThemeColor(newColor) {
    console.log(newColor)
    var options = {
        newColors: [...forElementUI.getElementUISeries(newColor)],
    }
    client.changer.changeColor(options, Promise)
    .then(() => {
        localStorage.setItem('theme_color', newColor)
    });
}

export function initColor() {
    let saveColor = localStorage.getItem("theme_color");
    if(saveColor) {
        changeThemeColor(saveColor);
    }
}