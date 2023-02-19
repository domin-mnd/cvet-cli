import { Args, Command, Flags } from "@oclif/core";
import { combination } from "cvet";
import type { HEX } from "cvet/dist/types/lib/types";
import { color } from "@oclif/color";

export default class Combination extends Command {
  static description = "Generate a palette of color combinations.";

  static examples = [
    "<%= config.bin %> <%= command.id %> 62c62c -q=5",
    '<%= config.bin %> <%= command.id %> "#62c62c" -quantity 6',
  ];

  static flags = {
    quantity: Flags.string({
      char: "q",
      description: "Quantity of colors to generate",
    }),
  };

  static args = {
    hex: Args.string({
      description: "Initial HEX color you want to generate a palette from",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Combination);
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

    const colors = combination(+(flags.quantity ?? 3), args.hex as HEX);

    const coloredColors = colors.map((hex: HEX) => color.hex(hex).bold(hex));

    this.log(color.cmd(" »   ") + coloredColors.join(" "));
  }
}
