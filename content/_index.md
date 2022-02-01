---
title: Home
---
{{< home/section title="What?" iconclass="fas fa-2x fa-power-off">}}

GitBOM is a minimalistic scheme for [build tools](/glossary/build_tool) to:

1. Build a compact [artifact tree](/glossary/artifact_tree), tracking every source code file incorporated into each built [artifact](/glossary/artifact).
2. Embed an id for that artifact tree, a [GitBOMId](/glossary/GitBOMId), into the artifact being built.

GitBOM is NOT:
- [Git](/glossary/git)
- An [SBOM](/resources/glossary/#sbom)
- A version control system

GitBOM is designed to:
- Construct verifiable [artifact trees](/glossary/artifact_tree) in language-heterogenous environments, across packaging formats, with zero developer effort, involvement, or awareness
- Complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid)
- Co-exist with, but not require, version control systems

GitBOM applies the [Unix Philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) of "do one thing, and do it well."
{{< /home/section >}}

{{< home/section title="Why?" >}}
By creating a unique, immutable, verifiable identifier (the [GitBOM identifier](glossary/gitbom/#gitbom-identifier)) for each piece of software, GitBOM:
- enables any software artifact to be definitively linked to any metadata (SBOM, License, Support Info, etc.)
- solves component naming challenges which plague SBOM adoption

By correlating every piece of software to a verifiable, complete, and concise artifact tree, GitBOM enables:
- Run-time detection of potential vulnerabilities in executables/containers by scanning a "fingerprint" rather than the contents
- Identifying license obligations across both open source and commercial software
- More reliable attestation
- Post-exploit forensics

{{< /home/section >}}

{{< home/section title="How?">}}
Drawing on the version control system [git](/glossary/git), GitBOM observes that:

1. Every artifact is a [blob](/glossary/git#blob)
2. Every blob has a [gitref](/glossary/git#git-ref)
3. Therefore the [gitref](/glossary/git#git-ref) may be used as an [artifact id](/glossary/artifact-identifier) for an [artifact](/glossary/artifact)
4. Most source code artifacts are stored already with their [gitref](/glossary/git#git-ref) as their id

GitBOM observes that for every artifact we can express its immediate children as a simple document consisting of new-line-separated records, in lexical order, one per child:

```
blob⎵${gitref of child}⎵bom⎵${gitref of child's GitBOM document}
```

The records for 'leaf artifacts' (child artifacts without their own child artifacts, e.g. source code files) should omit the `⎵bom⎵${gitref of child's GitBOM document}` because they have no GitBOM document.  They are expressed as:

```
blob⎵${gitref of child which is a leaf artifact}
```

Thus a GitBOM for an artifact with two child artifacts, one of which is a leaf artifact, would be expressed as:

```
blob⎵${gitref of child}⎵bom⎵${gitref of child's GitBOM document}
blob⎵${gitref of child which is a leaf artifact}
```

Note that the order of these records does not matter; they are sorted lexically for canonicalization.

Upon hashing this new GitBOM object one creates a [GitBOM identifier](glossary/gitbom/#gitbom-identifier).

GitBOM advocates for [build tools](/resources/glossary/#build-tools) (compilers, linkers, docker build, etc) to embed metadata containing the artifact's GitBOMId into the artifact output.  

Examples:

- elf file section named '.bom' for executables, .o files, .so files
- @BOM annotation in java .class files
- 'dot.bom' annotation container images

Since git blob hashes are small (20 bytes), the increase in artifact size should also be small, e.g. ~89 bytes in the elf file example.
{{< /home/section >}}
