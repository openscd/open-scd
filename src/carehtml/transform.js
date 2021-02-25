const registeredElements = new Map();

function toDashCase(name) {
  const dashCaseLetters = [];
  for (let i = 0; i < name.length; i += 1) {
    const letter = name[i];
    const letterLowerCase = letter.toLowerCase();
    if (letter !== letterLowerCase && i !== 0) {
      dashCaseLetters.push('-');
    }
    dashCaseLetters.push(letterLowerCase);
  }
  return dashCaseLetters.join('');
}

function incrementTagName(tag, counter, start = 1) {
  const newName = counter === start ? tag : `${tag}-${counter}`;
  const elementRegistered = !!customElements.get(newName);
  if (elementRegistered) {
    return incrementTagName(tag, counter + 1, start);
  }
  return newName;
}

function getClassUniqueTag(klass) {
  let tag = registeredElements.get(klass);

  if (tag) {
    return tag;
  }

  if (Object.prototype.hasOwnProperty.call(klass, 'name') && klass.name) {
    tag = toDashCase(klass.name);
    if (tag.indexOf('-') === -1) {
      tag = `c-${tag}`;
    }
    tag = incrementTagName(tag, 1);
  } else {
    tag = incrementTagName('c', 1, 0);
  }

  customElements.define(tag, klass);
  registeredElements.set(klass, tag);

  return tag;
}

export default function transform(strings, values) {
  if (values.length === 0) {
    return [strings];
  }
  const newStrings = [];
  const result = [0]; // first index is reserved for strings
  let mergeWithLastString = false;
  values.forEach((value, index) => {
    const string = strings[index];
    if (value && value.prototype instanceof HTMLElement) {
      const tag = getClassUniqueTag(value);
      if (mergeWithLastString) {
        const lastString = newStrings[newStrings.length - 1];
        newStrings[newStrings.length - 1] = `${lastString}${tag}${strings[index + 1]}`;
      } else {
        newStrings.push(`${string}${tag}${strings[index + 1]}`);
      }
      mergeWithLastString = true;
    } else {
      if (!mergeWithLastString) {
        newStrings.push(string);
      }
      result.push(value);
      mergeWithLastString = false;
    }
  });
  if (!mergeWithLastString) {
    newStrings.push(strings[strings.length - 1]);
  }
  result[0] = newStrings;
  return result;
}
