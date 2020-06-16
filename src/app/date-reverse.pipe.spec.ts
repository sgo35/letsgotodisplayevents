import { DateReversePipe } from "../pipes/date-reverse.pipe";

describe("DateReversePipe", () => {
  it("create an instance", () => {
    const pipe = new DateReversePipe();
    expect(pipe).toBeTruthy();
  });
});
