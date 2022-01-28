---
title: Home
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}
**GitBOM** is creative re-purposing of [git](https://en.wikipedia.org/wiki/Git)'s [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) to enable **automatic verifiable artifact resolution** across today's language-heterogeneous open source supply chains.

{{% notification type="info" %}}
**Note that GitBOM is not a replacement for [SBOM](/glossary/sbom)s**, nor is it a version control system or a signing scheme.

It is compatible with, and augments, these classes of tools.
{{% /notification %}}

Contrary to the name's appearance, GitBOM is neither [git](/glossary/git) nor an [SBOM](/glossary/sbom) -- it is a minimalistic scheme for all [build tools](/glossary/build_tool) to:

1. Generate a compact [artifact tree](/glossary/artifact_tree) which correlates source and object files involved in the generation of any built [artifact](/glossary/artifact).
2. Embed a unique [content-addressable reference](/glossary/gitbom/#gitbom-identifier) for that [artifact tree](/glossary/artifact_tree) into the [artifact](/glossary/artifact) at build time.
3. And do this consistently across languages, environments, and packaging formats, with zero developer effort, involvement, or awareness.
{{< /home/section >}}

{{< home/section title="Why?" >}}
By correlating every software [artifact](/glossary/artifact) to a verifiable, complete, and concise [artifact tree](/glossary/artifact_tree), GitBOM enables run-time detection of potential vulnerabilities, regardless of the depth in a depencency tree from which that vulnerability originated.

In short, it would let anyone easily answer the question, "does this product contain log4j?".
{{< /home/section >}}

{{< home/section title="How?" >}}

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
