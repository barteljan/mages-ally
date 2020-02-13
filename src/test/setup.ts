//@ts-ignore
jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';

      props: any;
      // @ts-ignore
      constructor(props) {
        this.props = props;
        this.setLanguage(this.language);
      }

      // @ts-ignore
      setLanguage(interfaceLanguage) {
        this.language = interfaceLanguage;
        if (this.props[interfaceLanguage]) {
          var localizedStrings = this.props[this.language];
          for (var key in localizedStrings) {
            if (localizedStrings.hasOwnProperty(key))
              // @ts-ignore
              this[key] = localizedStrings[key];
          }
        }
      }
    },
);
