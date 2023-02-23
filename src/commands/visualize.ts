import { Command, Flags } from "@oclif/core";
import type { HEX } from "cvet/types";
import { color } from "@oclif/color";

export default class Visualize extends Command {
  static description = "Visualize an array of provided colors.";

  static examples = [
    '<%= config.bin %> <%= command.id %> -h="62c62c,3c204b,00a1b9"',
    '<%= config.bin %> <%= command.id %> --hex "#62c62c, #3c204b, #00a1b9"',
  ];

  static flags = {
    hex: Flags.string({
      char: "h",
      description:
        "Initial array of HEX colors you want to visualize a palette from",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Visualize);
    this.log(`Generating ${color.cmd("palette")}...`);

    let hex = flags.hex.split(",");
    hex = hex.map((hex) => hex.trim());

    if (hex.some((hex) => !hex.startsWith("#"))) {
      this.log(`Prepending ${color.cmd("#")}...`);
      hex = hex.map((hex) => (hex.startsWith("#") ? hex : "#" + hex));
    }

    hex.forEach((hex) => {
      if (hex.length !== 7) {
        this.error(
          `Finished an action with malformed HEX: ${color.red(
            "Invalid HEX length: " + hex
          )}`
        );
      }
    });

    const coloredColors = hex.map((hex) => color.hex(hex).bold(hex));

    this.log(color.cmd(" »   ") + coloredColors.join(" "));
  }
}
