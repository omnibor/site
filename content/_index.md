---
title: GitBOM
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}

**[GitBOM](/glossary/gitbom)** is a minimalistic scheme for [build tools](/glossary/build_tool) to:
1. Build a compact [artifact tree](/glossary/artifact_tree), tracking every source code file incorporated into each built [artifact](/glossary/artifact).
2. Embed a unique, content-addressable reference for that [artifact tree](/glossary/artifact_tree/), the [GitBOM identifier](/glossary/gitbom/#gitbom-identifier), into the [artifact](/glossary/artifact) at build time.

[GitBOM](/glossary/gitbom) is designed to:
- Consistently construct verifiable [artifact trees](/glossary/artifact_tree) across languages, environments, and packaging formats, with zero developer effort, involvement, or awareness
- Enable automatic, verifiable [artifact](/glossary/artifact) resolution across today's diverse software supply chains
- Complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid)
- Co-exist with, but not require, version control systems

{{% notification type="info" %}}
**[GitBOM](/glossary/gitbom) is NOT** (contrary to the name's appearance):
- [Git](/glossary/git)
- An [SBOM](/glossary/sbom), nor a replacement for SBOMs
- A version control system
- A signing scheme

It is compatible with and augments these classes of tools.
{{% /notification %}}


{{< /home/section >}}

{{< home/section title="Why?" >}}
[GitBOM](/glossary/gitbom) applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well."

By constructing a complete, concise, and verifiable [artifact tree](/glossary/artifact_tree) for every [software artifact](/glossary/artifact), [GitBOM](/glossary/gitbom) enables:
- Run-time detection of potential vulnerabilities, regardless of the depth in a dependency tree from which that vulnerability originated
- Post-exploit forensics

By creating a unique, immutable, verifiable identifier (the [GitBOM ID](/glossary/gitbom/#gitbom-identifier)) for every [software artifact](/glossary/artifact), [GitBOM](/glossary/gitbom):
- enables any metadata ([SBOM](/glossary/sbom), license, support info, security advisories, etc.) to be linked to a specific set of corresponding [software artifacts](/glossary/artifact)
- provides a precise [artifact identifier](/glossary/artifact/#artifact-identifiers) which can be used in SBOMs in situations where [naming schemes](/glossary/gitbom/#gitbom-complements-sbom) may be ambiguous

In short, it would let anyone easily answer the question, "Does this product contain log4j?"
{{< /home/section >}}

{{< home/section title="How?" >}}
##### How does [GitBOM](glossary/gitbom/) improve software identification and vulnerability management?

[GitBOM](glossary/gitbom/) proposes a solution to the completeness and the efficiency challenges facing other supply chain tools.
- By correlating every piece of software with a verifiable and complete tree of all the "ingredients" that went into it (source files, dependencies, object files, etc.), [GitBOM](glossary/gitbom/) enables the identification of software derived from sources known to contain vulnerabilities.
- [GitBOM](glossary/gitbom/) only includes the minimum information -- a "fingerprint" -- of the dependency graph to enable efficient run-time scanning for a known-vulnerable artifact
- A [GitBOM](glossary/gitbom/) [artifact tree](/glossary/artifact_tree) can be cross-referenced against known vulnerabilities, regardless of the dependency depth or language.

##### How does [GitBOM](glossary/gitbom/) work?

Drawing on the version control system [git](/glossary/git/), [GitBOM](glossary/gitbom/) observes that:

1. Every artifact is a [blob](/glossary/git/#git-blob)
2. Every [blob](/glossary/git/#git-blob) can be referenced by its [gitoid](/glossary/git/#git-object-id-gitoid)
3. The [gitoid](/glossary/git/#git-object-id-gitoid) may be used as an [artifact ID](/glossary/artifact/#artifact-identifiers) for [leaf artifacts](/glossary/artifact/#leaf-artifacts) (In fact, today most source code artifacts are already stored with their git commit as their ID)
4. [Artifact IDs](/glossary/artifact/#artifact-identifiers) can be extended to [derived artifacts](glossary/artifact/#derived-artifacts) by producing [GitBOM Documents](/glossary/gitbom/#gitbom-document)
5. [Build tools](/glossary/#build-tool) can embed [GitBOM Document Identifiers](/glossary/gitbom/#gitbom-identifier) into the [derived artifacts](glossary/artifact/#derived-artifacts) they produce

[GitBOM](/glossary/gitbom) creatively re-purposes [git](https://en.wikipedia.org/wiki/Git)'s [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) to do all this. For a deeper analysis of this proposal, check out the **[white paper](resources/whitepaper)**.

We believe this approach can work across all packaging formats, language ecosystems, and operating systems.

And we'd like your help to build it.
{{< /home/section >}}

{{< home/section title="Get Involved">}}

Head over to the **[community page](/community)** for details on meeting times, mailing lists, and more.

{{< /home/section >}}
