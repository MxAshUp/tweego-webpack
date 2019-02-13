import YAML from 'yaml';

export default function(State, Story, $document) {
  const allPassages = Story.lookupWith(() => true);
  // Look for passages formatted like this "::properties: Chapter 1"
  const propertySetPassages = allPassages.filter(({title}) => /properties:\s/i.test(title));
  // Look through the pass body for lines like this: "title: Chapter 1 - Recruitment and Selection"
  // ...and parse them as property-setters
  const passagePropertySetters = propertySetPassages.map(({title, text}) => {
    const [,passageMatcher] = title.match(/properties:\s*(.+)$/i);

    const properties = YAML.parse(text);

    return {
      passageMatcher: new RegExp(`^${passageMatcher}`),
      properties,
    };
  });

  // When each passage loads, we look at the passage data in property passages (::properties: Chapter 1)
  // ... then set the data to State.variables.passageProperties
  $document.on(':passageinit', ({passage}) => {
    const {
      title,
    } = passage;

    State.variables.passageProperties = {};

    const filteredSetters = passagePropertySetters.filter(({passageMatcher}) => passageMatcher.test(title));

    // This mess gets all applicable properties and their values in the form of an object
    const properties = filteredSetters.reduce((o, {properties}) => {
      return {
        ...o,
        ...properties,
      };
    }, {});

    State.variables.passageProperties = properties;

    $document.trigger(':passageinitproperties', [properties]);

  });
}