import {YantraType} from '../Yantra.type';
import {SectionListData} from 'react-native';
import {staticYantras, BaseYantra} from '../yantra';
import {
  yantraGroupLocalization,
  yantraDescriptionLocalization,
  yantraTitleLocalization,
} from '../Yantra.strings';

export const decorateWithNameAndDescription = (
  yantra: any,
): BaseYantra<YantraType, number, string> => {
  if (!yantra.name) {
    yantra.name = yantraTitleLocalization[yantra.yantraType as YantraType];
  }

  if (!yantra.description) {
    yantra.description =
      yantraDescriptionLocalization[yantra.yantraType as YantraType];
  }

  return yantra;
};

export const makeChoosableYantras = () => {
  const choosableYantras: SectionListData<
    BaseYantra<YantraType, number, string>
  >[] = [
    {
      title: yantraGroupLocalization.location,
      data: [
        decorateWithNameAndDescription(staticYantras.demesne),
        decorateWithNameAndDescription(staticYantras.location),
        decorateWithNameAndDescription(staticYantras.verge),
      ],
    },
    {
      title: yantraGroupLocalization.actions,
      data: [
        decorateWithNameAndDescription(staticYantras.roteSkill),
        decorateWithNameAndDescription(staticYantras.concentration),
        decorateWithNameAndDescription(staticYantras.highSpeech),
        decorateWithNameAndDescription(staticYantras.runes),
      ],
    },
    {
      title: yantraGroupLocalization.tools,
      data: [
        decorateWithNameAndDescription(staticYantras.dedicatedTool),
        decorateWithNameAndDescription(staticYantras.pathTool),
        decorateWithNameAndDescription(staticYantras.orderTool),
        decorateWithNameAndDescription(staticYantras.materialSympathy),
        decorateWithNameAndDescription(staticYantras.representationalSympathy),
        decorateWithNameAndDescription(staticYantras.symbolicSympathy),
        decorateWithNameAndDescription(staticYantras.sacrament),
        decorateWithNameAndDescription(staticYantras.rareSacrament),
        decorateWithNameAndDescription(staticYantras.otherworldlySacrament),
        decorateWithNameAndDescription(staticYantras.persona),
      ],
    },
  ];
  return choosableYantras;
};
