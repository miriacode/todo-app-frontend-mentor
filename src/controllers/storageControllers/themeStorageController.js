class ThemeStorageController {
    constructor(keyTheme) {
      this.myStorage = window.localStorage;
      this.keyTheme = keyTheme;
    }

    saveTheme(theme){
        const stringifiedTheme =JSON.stringify(theme);
        this.myStorage.setItem(this.keyTheme,stringifiedTheme)
    }
    getTheme(){
        const stringifiedTheme = this.myStorage.getItem(this.keyTheme);
        const parsedTheme=JSON.parse(stringifiedTheme)
        return parsedTheme
    }
}