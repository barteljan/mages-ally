import {makeSpellSpecification} from '../Spell.config.specification';
import {Yantra} from '../yantra/yantra';
import {YantraType} from '../yantra/Yantra.type';
import {GameValueType} from '../../../GameValueTypes';
import {makeCharactersArcanum} from '../../character/CharactersArcanum';
import {ArcanaType} from '../arcana/Arcana.type';
import {spellModifiersFromSpecification} from '../calculations/spellModifiersFromSpecification';
import {makeModifierIdForCustomYantra} from '../yantra/helper/makeModifierIdForCustomYantra';
test('check that yantras are correcly extracted', () => {
  const highestArcanum = makeCharactersArcanum(ArcanaType.death, {
    diceModifier: 1,
  });

  const demenseYantra: Yantra = {
    id: YantraType.demesne,
    type: GameValueType.yantra,
    diceModifier: 2,
    yantraType: YantraType.demesne,
  };

  const customYantra: Yantra = {
    id: 'custom',
    type: GameValueType.yantra,
    diceModifier: 3,
    yantraType: YantraType.custom,
  };

  const customYantraId = makeModifierIdForCustomYantra(customYantra);

  let specification = makeSpellSpecification({
    yantras: [demenseYantra, customYantra],
  });

  const modifiers = spellModifiersFromSpecification(
    highestArcanum,
    specification,
  );

  expect(modifiers.demesne).toBe(demenseYantra);
  expect(modifiers[customYantraId]).toBe(customYantra);
});
