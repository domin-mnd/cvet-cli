import { Args, Command } from "@oclif/core";
import { square } from "cvet";
import type { HEX } from "cvet/types";
import { color } from "@oclif/color";

export default class Square extends Command {
  static description =
    "Generate a square of colors (4 colors).";

  static examples = [
    "<%= config.bin %> <%= command.id %> 62c62c",
    '<%= config.bin %> <%= command.id %> "#62c62c"',
  ];

  static args = {
    hex: Args.string({
      description: "Initial HEX color you want to generate a palette from",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args } = await this.parse(Square);
    this.log(`Generating ${color.cmd("palette")}...`);

    if (!args.hex.startsWith("#")) {
      this.log(`Prepending ${color.cmd("#")}...`);
      args.hex = "#" + args.hex;
    }

    if (args.hex.length !== 7) {
      this.error(
        `Finished an action with malformed HEX: ${color.red(
          "Invalid HEX length"
        )}`
      );
    }

    const colors = square(args.hex as HEX);

    const coloredColors = colors.map((hex: HEX) => color.hex(hex).bold(hex));

    this.log(color.cmd(" »   ") + coloredColors.join(" "));
  }
}
