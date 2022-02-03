---
title: Home
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
- An [SBOM](/resources/glossary/#sbom), nor a replacement for SBOMs
- A version control system
- A signing scheme

It is compatible with, and augments, these classes of tools.
{{% /notification %}}

[GitBOM](/glossary/gitbom) applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well."

{{< /home/section >}}

{{< home/section title="Why?" >}}
By correlating every software [artifact](/glossary/artifact) to a verifiable, complete, and concise [artifact tree](/glossary/artifact_tree), GitBOM enables run-time detection of potential vulnerabilities, regardless of the depth in a dependency tree from which that vulnerability originated.

In short, it would let anyone easily answer the question, "Does this product contain log4j?"
{{< /home/section >}}

{{< home/section title="How?" >}}

[GitBOM](/glossary/gitbom) is creative re-purposing of [git](https://en.wikipedia.org/wiki/Git)'s [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

With GitBOM, we propose a solution to both the completeness and the efficiency challenges facing other supply chain tools.

- By correlating every piece of software with a verifiable and complete tree of all the "ingredients" that went into it, GitBOM enables the identification of software derived from sources known to contain vulnerabilities.
- Unlike SBOMs, which contain metadata unrelated to the task of representing the dependency graph, GitBOM only includes the minimum information -- a "fingerprint" -- to enable efficient run-time scanning.
- A GitBOM [artifact tree](/glossary/artifact_tree) can be cross-referenced against known vulnerabilities, regardless of the dependency depth and language.

We believe this approach can work across all packaging formats, language ecosystems, and operating systems.

For a deeper analysis of this proposal, check out the **[white paper](resources/whitepaper)**.

We'd like your help to build it.
{{< /home/section >}}

{{< home/section title="Get Involved">}}

Head over to the **[community page](/community)** for details on meeting times, mailing lists, and more.

{{< /home/section >}}
