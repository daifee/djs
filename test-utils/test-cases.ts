
import groupCases from './group-cases';

export default function testCases(cases: Array<[any, any]>): void {
  const { received, expected } = groupCases(cases);

  expect(received).toStrictEqual(expected);
}
