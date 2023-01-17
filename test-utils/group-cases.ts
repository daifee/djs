
export default function groupCases(cases: Array<[any, any]>): { received: any[], expected: any[] } {
  const received: any[] = [];
  const expected: any[] = [];

  cases.forEach((item) => {
    received.push(item[0]);
    expected.push(item[1]);
  });

  return { received, expected };
}
