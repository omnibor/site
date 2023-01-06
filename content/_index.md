---
title: OmniBOR
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}

**[OmniBOR](/glossary/omnibor)** (Universal **B**ill **O**f **R**eceipts) is a minimalistic scheme for [build tools](/glossary/build_tool) to:
1. Build a compact [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph), tracking every source code file incorporated into each built [artifact](/glossary/artifact).
2. Embed a unique, content-addressable reference for that [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph/), the [OmniBOR identifier](/glossary/omnibor/#omnibor-identifier), into the [artifact](/glossary/artifact) at build time.

[OmniBOR](/glossary/omnibor) is designed to:
- Consistently construct verifiable [Artifact Dependency Graph (ADG)s](/glossary/artifact_dependency_graph) across languages, environments, and packaging formats, with zero developer effort, involvement, or awareness

- Enable automatic, verifiable [artifact](/glossary/artifact) resolution across today's diverse software supply chains
- Complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid)
- Co-exist with, but not require, version control systems

{{% notification type="info" %}}
**[OmniBOR](/glossary/omnibor) is NOT**:
- [Git](/glossary/git) (or any other [VCS](https://en.wikipedia.org/wiki/Version_control))
- An [SBOM](/glossary/sbom), nor a replacement for SBOMs
- A signing scheme

It is compatible with and augments these classes of tools.
{{% /notification %}}

*OmniBOR was formerly known as {{% gitbom-orange %}}**[GitBOM](https://gitbom.omnibor.io/)**{{% /gitbom-orange %}}.*


{{< /home/section >}}

{{< home/section title="Why?" >}}
[OmniBOR](/glossary/omnibor) applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well."

By constructing a complete, concise, and verifiable [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph) for every [software artifact](/glossary/artifact), [OmniBOR](/glossary/omnibor) enables:
- Run-time detection of potential vulnerabilities, regardless of the depth in the [ADG](/glossary/artifact_dependency_graph) for every [software artifact](/glossary/artifact) from which that vulnerability originated

- Post-exploit forensics

By creating a unique, immutable, verifiable identifier (the [OmniBOR ID](/glossary/omnibor/#omnibor-identifier)) for every [software artifact](/glossary/artifact), [OmniBOR](/glossary/omnibor):
- enables any metadata ([SBOM](/glossary/sbom), license, support info, security advisories, etc.) to be linked to a specific set of corresponding [software artifacts](/glossary/artifact)
- provides a precise [artifact identifier](/glossary/artifact/#artifact-identifiers) which can be used in SBOMs in situations where [naming schemes](/glossary/omnibor/#omnibor-complements-sbom) may be ambiguous

In short, it would let anyone easily answer the question, "Does this product contain log4j?"
{{< /home/section >}}

{{< home/section title="How?" >}}
##### How does [OmniBOR](glossary/omnibor/) improve software identification and vulnerability management?

[OmniBOR](glossary/omnibor/) proposes a solution to the completeness and the efficiency challenges facing other supply chain tools.
- By correlating every piece of software with a verifiable and complete [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph) of all the "ingredients" that went into it (source files, dependencies, object files, etc.), [OmniBOR](glossary/omnibor/) enables the identification of software derived from sources known to contain vulnerabilities.
- [OmniBOR](glossary/omnibor/) only includes the minimum information -- a "fingerprint" -- of the dependency graph to enable efficient run-time scanning for a known-vulnerable artifact
- A [OmniBOR](glossary/omnibor/) [Artifact Dependency Graph (ADG)](/glossary/artifact_dependency_graph) can be cross-referenced against known vulnerabilities, regardless of the dependency depth or language.

##### How does [OmniBOR](glossary/omnibor/) work?

Drawing on the version control system [git](/glossary/git/), [OmniBOR](glossary/omnibor/) observes that:

1. Every artifact is a [blob](/glossary/git/#git-blob)
2. Every [blob](/glossary/git/#git-blob) can be referenced by its [gitoid](/glossary/git/#git-object-id-gitoid)
3. The [gitoid](/glossary/git/#git-object-id-gitoid) may be used as an [artifact ID](/glossary/artifact/#artifact-identifiers) for [leaf artifacts](/glossary/artifact/#leaf-artifacts) (In fact, today most source code artifacts are already stored with their git commit as their ID)
4. [Artifact IDs](/glossary/artifact/#artifact-identifiers) can be extended to [derived artifacts](glossary/artifact/#derived-artifacts) by producing [OmniBOR Documents](/glossary/omnibor/#omnibor-document)
5. [Build tools](/glossary/#build-tool) can embed [OmniBOR Document Identifiers](/glossary/omnibor/#omnibor-identifier) into the [derived artifacts](glossary/artifact/#derived-artifacts) they produce

[OmniBOR](/glossary/omnibor) creatively re-purposes [git](https://en.wikipedia.org/wiki/Git)'s [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) to do all this. For a deeper analysis of this proposal, check out the **[white paper](resources/whitepaper)**.

We believe this approach can work across all packaging formats, language ecosystems, and operating systems.

And we'd like your help to build it.
{{< /home/section >}}

{{< home/section title="Get Involved">}}

Head over to the **[community page](/community)** for details on meeting times, mailing lists, and more.

{{< /home/section >}}
