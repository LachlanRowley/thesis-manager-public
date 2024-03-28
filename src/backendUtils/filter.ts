import prisma from '../lib/prisma'
/**
   * This function takes a prisma.\<table>.fields object and a query object and returns a prisma.\<table>.findMany() compatible object
   */
export default function filterTable(fields: any, query: any) {

    function castType(type: string, value: any) {
      switch(type) {
        case "Int":
          return parseInt(value);
        case "String":
            return value;
        case "Boolean":
            return value;
      }
    }
    let filterObj: {[key: string]: any}= {}


    for (let field of Object.keys(fields)) {
        if (query[field]) {
            filterObj[field] = castType(fields[field]["typeName"], query[field]);
        }
    }

    return filterObj;
}