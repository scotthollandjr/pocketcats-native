import Realm from 'realm';

const realm = new Realm({
  schema: [{
    name: 'Cat',
    primaryKey: 'id',
    properties: {
      id:          { type: 'string', indexed: true },
      age:         'int',
      description: 'string',
      gender:      'string',
      image:       'string',
      location:    'Coordinate',
      logged:      'date',
      name:        { type: 'string', indexed: true },
      tagged:      'bool',
      type:        { type: 'string', indexed: true },
      user:        { type: 'string', indexed: true },
    }
  }, {
    name: 'Coordinate',
    properties: {
      latitude:  'float',
      longitude: 'float',
    }
  }]
});

export { realm };
