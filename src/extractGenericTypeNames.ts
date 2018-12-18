/**
 * @copyright   2018-2019, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

import { types as t } from '@babel/core';
import getTypeName from './getTypeName';

export default function extractGenericTypeNames(node: any): string[] {
  const names: string[] = [];

  // <Foo>
  if (t.isTSTypeParameterInstantiation(node)) {
    node.params.forEach(param => {
      names.push(...extractGenericTypeNames(param));
    });

    // Foo
  } else if (t.isTSTypeReference(node)) {
    names.push(getTypeName(node.typeName));

    // Foo & Bar, Foo | Bar
  } else if (t.isTSIntersectionType(node) || t.isTSUnionType(node)) {
    node.types.forEach(param => {
      names.push(...extractGenericTypeNames(param));
    });
  }

  return names;
}
