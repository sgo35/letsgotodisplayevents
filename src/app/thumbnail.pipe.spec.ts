import { ThumbnailPipe } from "../pipes/thumbnail.pipe";

describe("ThumbnailPipe", () => {
  it("create an instance", () => {
    const pipe = new ThumbnailPipe();
    expect(pipe).toBeTruthy();
  });
});
