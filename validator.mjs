import blueprint from "./plutus.json" with { type: "json" };

export function getValidators() {
    const mintMintingPolicy = blueprint.validators.find(v => v.title === "mint.mint");
    if (!mintMintingPolicy) {
        throw new Error('mintMintingPolicy not found');
    }

    return {
        mintMintingPolicy: {
            type: "PlutusV2",
            script: mintMintingPolicy.compiledCode
        }
    };
}
