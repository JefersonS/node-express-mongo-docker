export const getNames = ({ Name, debug }) => async () => {
  try {
    debug('getNames.name');
    const allNames = await Name.find({ deleted: false }, { name: 1, position: 1 }).limit(15);
    return [, allNames];
  } catch (error) {
    debug(error);
    return [error, undefined];
  }
}

export const putName = ({ Name, debug }) => async ({ name, position }) => {
  try {
    debug(`${putName.name} ${name} ${position}`);
    const newNameParams = {
      name: name,
      position: position,
      created: new Date()
    }

    const newName = new Name(newNameParams);
    const savedName = await newName.save();
    return [, savedName];
  } catch (error) {
    debug(error);
    return [error, undefined];
  }
}

export const updateName = ({ Name, debug }) => async ({ id, name, position }) => {
  try {
    debug(`${updateName.name} ${id} ${name} ${position}`);
    const updatedName = await Name.findOneAndUpdate({ _id: id, deleted: false }, { name, position });
    updatedName.name = name;
    updatedName.position = position;
    return [, updatedName];
  } catch (error) {
    debug(error);
    return [error, undefined];
  }
}

export const deleteName = ({ Name, debug }) => async ({ id }) => {
  try {
    debug(`${deleteName.name} ${id}`);
    const deletedName = await Name.findOneAndUpdate({ _id: id }, { deleted: true });
    deletedName.deleted = true;
    return [undefined, deletedName];
  } catch (error) {
    debug(error);
    return [error, undefined];
  }
}

export const getName = ({ Name, debug }) => async ({ id }) => {
  try {
    debug(`${getName.name} ${id}`);
    const foundName = await Name.find({ _id: id }, { name: 1, position: 1 }).limit(1);
    return [, foundName];
  } catch (error) {
    debug(error);
    return [error, undefined];
  }
}

export const getNamesRegExp = ({ Name, debug }) => async ({ name }) => {
  try {
    debug(`${getNamesRegExp.name} ${name}`);
    const nameRegExp = new RegExp(name, 'i');
    const names = await Name.find({ name: nameRegExp, deleted: false }, { name: 1, position: 1 }).limit(6);
    return [, names];
  } catch (error) {
    debug(error);
    return [error, undefined];
  }
}