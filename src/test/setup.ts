jest.mock(
  'react-native-localization',
  () =>
    class RNLocalization {
      language = 'en';

      props: any;
      constructor(props) {
        this.props = props;
        this.setLanguage(this.language);
      }

      setLanguage(interfaceLanguage) {
        this.language = interfaceLanguage;
        if (this.props[interfaceLanguage]) {
          var localizedStrings = this.props[this.language];
          for (var key in localizedStrings) {
            if (localizedStrings.hasOwnProperty(key))
              this[key] = localizedStrings[key];
          }
        }
      }
    },
);
