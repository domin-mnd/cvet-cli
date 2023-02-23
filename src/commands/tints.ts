import { Args, Command, Flags } from "@oclif/core";
import { tints } from "cvet";
import type { HEX } from "cvet/types";
import { color } from "@oclif/color";

export default class Tints extends Command {
  static description = "Generate an array of tints with a provided quantity.";

  static examples = [
    "<%= config.bin %> <%= command.id %> 62c62c --quantity 8",
    '<%= config.bin %> <%= command.id %> "#62c62c" -q=8',
    "<%= config.bin %> <%= command.id %> 62c62c",
  ];

  static flags = {
    quantity: Flags.string({
      char: "q",
      description: "Quantity of colors to generate",
      default: "8",
      required: false,
    }),
  };

  static args = {
    hex: Args.string({
      description: "Initial HEX color you want to generate a palette from",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Tints);
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

    const colors = tints(args.hex as HEX, +flags.quantity);

    const coloredColors = colors.map((hex: HEX) => color.hex(hex).bold(hex));

    this.log(color.cmd(" »   ") + coloredColors.join(" "));
  }
}
