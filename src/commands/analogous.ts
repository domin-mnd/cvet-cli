import { Args, Command } from "@oclif/core";
import { analogous } from "cvet";
import type { HEX } from "cvet/dist/types/lib/types";
import { color } from "@oclif/color";

export default class Analogous extends Command {
  static description = "Generate a palette of analogous colors.";

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
    const { args } = await this.parse(Analogous);
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

    const colors = analogous(args.hex as HEX);

    const coloredColors = colors.map((hex: HEX) => color.hex(hex).bold(hex));

    this.log(color.cmd(" »   ") + coloredColors.join(" "));
  }
}
