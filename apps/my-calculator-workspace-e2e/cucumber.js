module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ["./world.ts", "src/steps/**/*.ts", "src/support/world.ts"],
    paths: ["src/features/**/*.feature"],
  },
};
