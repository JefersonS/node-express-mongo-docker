import chai from 'chai';
import {
  deleteName,
  getName,
  getNames,
  updateName,
  getNamesRegExp,
  putName
} from './names';

const expect = chai.expect;

function NameConstructor() {
  return {
    save: () => 'saved'
  }
}

function NameConstructorRejected() {
  return {
    save: () => { throw 'error' }
  }
}

const NameFuncs = {
  find: (args) => {
    return {
      limit: async () => 'names'
    }
  },
  findOneAndUpdate: (args) => ({status: 'updated'})
}

const NameFuncsRejected = {
  find: (args) => {
    return {
      limit: async () => { throw 'error' }
    }
  },
  findOneAndUpdate: (args) => { throw 'error' }
}

function debug(txt) {
  return 'printed';
}

describe('Testing names API', () => {

  it('Should get auto-complete names', async () => {
    const dependencies = { Name: NameFuncs, debug };
    const arg = { name: 'Some Name' };
    let result, error;

    try {
      const response = await getNamesRegExp(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal(undefined);
      expect(result).to.be.equal('names');
    }
  });

  it('Should fail trying to get auto-complete names', async () => {
    const dependencies = { Name: NameFuncsRejected, debug };
    const arg = { name: 'Some Name' };
    let result, error;

    try {
      const response = await getNamesRegExp(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal('error');
      expect(result).to.be.equal(undefined);
    }
  });

  it('Should get all names', async () => {
    const dependencies = { Name: NameFuncs, debug };
    let result, error;

    try {
      const response = await getNames(dependencies)();
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal(undefined);
      expect(result).to.be.equal('names');
    }
  });

  it('Should fail to get all names', async () => {
    const dependencies = { Name: NameFuncsRejected, debug };
    let result, error;

    try {
      const response = await getNames(dependencies)();
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal('error');
      expect(result).to.be.equal(undefined);
    }
  });

  it('Should save a new name', async () => {
    const dependencies = { Name: NameConstructor, debug };
    const arg = { name: 'Some Name', position: 'some position' };
    let result, error;

    try {
      const response = await putName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal(undefined);
      expect(result).to.be.equal('saved');
    }
  });

  it('Should fail to save a new name', async () => {
    const dependencies = { Name: NameConstructorRejected, debug };
    const arg = { name: 'Some Name' };
    let result, error;

    try {
      const response = await putName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal('error');
      expect(result).to.be.equal(undefined);
    }
  });

  it('Should update a name', async () => {
    const dependencies = { Name: NameFuncs, debug };
    const arg = { id: 'some id', name: 'Some Name', position: 'some position' };
    let result, error;

    try {
      const response = await updateName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal(undefined);
      expect(result.status).to.be.equal('updated');
    }
  });

  it('Should fail trying to update a name', async () => {
    const dependencies = { Name: NameFuncsRejected, debug };
    const arg = { id: 'some id', name: 'Some Name', position: 'some position' };
    let result, error;

    try {
      const response = await updateName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal('error');
      expect(result).to.be.equal(undefined);
    }
  });

  it('Should delete a name', async () => {
    const dependencies = { Name: NameFuncs, debug };
    const arg = { id: 'some id' };
    let result, error;

    try {
      const response = await deleteName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal(undefined);
      expect(result.status).to.be.equal('updated');
    }
  });

  it('Should fail trying to delete a name', async () => {
    const dependencies = { Name: NameFuncsRejected, debug };
    const arg = { id: 'some id' };
    let result, error;

    try {
      const response = await deleteName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal('error');
      expect(result).to.be.equal(undefined);
    }
  });

  it('Should get a name', async () => {
    const dependencies = { Name: NameFuncs, debug };
    const arg = { id: 'Some id' };
    let result, error;

    try {
      const response = await getName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal(undefined);
      expect(result).to.be.equal('names');
    }
  });

  it('Should fail trying to get a name', async () => {
    const dependencies = { Name: NameFuncsRejected, debug };
    const arg = { id: 'Some id' };
    let result, error;

    try {
      const response = await getName(dependencies)(arg);
      error = response[0];
      result = response[1];
    } catch (err) {
      error = err
    } finally {
      expect(error).to.be.equal('error');
      expect(result).to.be.equal(undefined);
    }
  });
});