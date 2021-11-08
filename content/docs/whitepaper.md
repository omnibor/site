Towards a GitBOM Specification
===

:::info
Author: Aeva Black 
Contact: aeva dot online at gmail / @aeva on OFTC IRC / @aeva.online:matrix.org

Updated: 2021-08-26

Status: WORK-IN-PROGRESS / Seeking Collaborators
:::

## Summary

GitBOM is a novel and minimalistic approach to generating artifact trees at build time, thereby enabling launch-time comparison of vulnerability data against a complete artifact tree for open source projects.

### Objective

It is desirable to enable efficient launch-time comparison of the verifiable and complete build tree of any executable component [1] against a then-current list of undesirable source files [2] which are known to be undesirable, where such a build tree contains unique referents for all sources from which the given executable object was composed. 

[1]: binary, dynamically-linked library, container image, etc.

[2]: because vulnerabilities may be discovered between the time an executable is created and the time when it is run, these processes must be decoupled


### Proposal

In an ideal scenario, an open source consumer would have available to them a complete artifact tree, tracing dependencies to their ultimate depth. Even if we do not achieve this ideal, we should seek a solution with the lowest cost of adoption so as to enable the greatest buy-in across all open source ecosystems and communities.

For this reason we propose two areas of work:
1. enhancing artifact-generating tools (e.g., compilers, linkers, and container image generators) to also output metadata regarding their inputs and outputs
2. defining a storage format which represents the minimum information to describe the artifact relationship tree, and which uses git's on-disk storage format

Following from (1), this approach will require minimal to no effort on the part of open source project maintainers, thus significantly increasing its chances of widespread adoption as compared to any approach which requires maintainers to perform additional actions (e.g., implementing substantive changes in their CI/CD or package build pipeline to generate an SBOM).

Following from (2), this on-disk format provides an efficient and already well-understood method for cross referencing artifacts and source files by a deterministically-generated UUID (SHA1 or SHA256).


### ASCII-Art Flow Chart
``` 
 ┌─────────────────────────────┐
 │ Build-time Tree Generation  │
 │                             │
 │ ┌────────┐   ┌────────┐     │
 │ │ Src  A │   │ Src  B │     │
 │ └───┬────┘   └──┬─────┘     │
 │     │           │           │
 │     ▼           │           │
 │  ┌───────┐      │           │
 │  │ Obj A │      │           │
 │  └─────┬─┘      │           │
 │        │        │           │
 │        ▼        ▼           │
 │        ┌─────────────┐      │
 │        │ Compilation │      │
 │        │  & Signing  │      │
 │        └─────┬───────┘      │
 │              │              │
 └──────────────┼──────────────┘
                │
             ┌──▼─┐
             ▼    ▼
   ┌──────────┐   ┌──────┐
   │ [header] ├──►│gitbom│
   │executable│   │ tree │
   └──────┬───┘   └┬─────┘
          │        │
  ┌───────┼────────┼────────────────────────────┐
  │       │        │     Launch Time Comparison │
  │       │        │                            │
  │       ▼        ▼            ┌────────────┐  │
  │     ┌───────────────┐       │   Public   │  │
  │     │     Policy    │◄─────►│    Vuln    │  │
  │     │  Enforcement  │       │  Database  │  │
  │     └─┬─────────────┘       └────────────┘  │
  │       │                                     │
  │       ▼                                     │
  │      ┌─────────────────────┐                │
  │      │ Runtime Environment │                │
  │      └─────────────────────┘                │
  │                                             │
  └─────────────────────────────────────────────┘

```


## GitBOM

GitBOM is an approach which has the following properties:
1. re-uses a well understood paradigm for modelling artifact relationships efficiently in flat files on disk in a machine-readable format
2. optimally efficient approach for run-time comparison of any given binary object against a dataset of signatures of known-vulnerable inputs 
3. does not require project maintainers to make any changes to their workflow in order to comply with the Biden EO
4. has a bounded scope of work to achieve near-complete coverage of the F/OSS landscape
5. could be integrated with both free and commercial services

### Characteristics

1. **Artifact Equivalence**: Two artifacts are equivalent IFF `[]byte(artifact1) == []byte(artifact2)`.
2. **Artifact Identity**: Independent parties, presented with equivalent artifacts, derive the same artifact identity.
3. **Immutability**: An identified artifact can not be modified without also changing its identity.
4. **Uniqueness**: An artifact can have precisely *one* artifact identity graph. All equivalent artifacts have the same graph.
5. **Transparently Opaque**: Artifacts and associated metadata may be obfuscated when sharing the artifact identity graph, while preserving other properties.
6. **Truncatability of Tree**: Artifact identity graphs may themselves be treated as artifacts, enabling truncation of a part of the graph and replacing the leading node with a signature of the sub-graph, thereby preserving all other properties with respect to the whole.
7. **Independent Metadata**: Artifacts may be associated, through their identity, to independently generated metadata stored outside of the artifact identity graph, such as an SBOM containing license and provenance metadata.
8. **Authoritative Reference**: By generating the artifacts in the authoring function, correctness of the generated artifact identity graph can have the minimum number of dependencies (N=1) and least error rate of all solutions which could generate similar graphs.
9. **Non-reputability**: 
10. **Embedded**: An artifact includes a unique identifier of the document containing the artifact identity graph used to generate that artifact.


#### 1. Artifact Equivalence

*Two artifacts are equivalent if `[]byte(artifact1) == []byte(artifact2)`.*

Two artifacts are said to be equivalent if and only if they are byte-for-byte identical. This implies that GitBOM is not concerned with questions of provenance, origination, licensure, or many others aspects which are encompassed by a software bill of materials, and which could differ between byte-equivalent artifacts.

#### 2. Artifact Identity

*Independent parties, presented with equivalent artifacts, derive the same artifact identity.* 

This implies that a deterministic hashing function may be used to derive artifact identity, such as SHA256.

#### 3. Immutability

*An identified artifact can not be modified without also changing its identity. Non-equivalent artifacts have distinct identities.*

"An identified artifact" means an artifact whose identity has been determined. "Can not be modified without also changing its identity" means that the deterministic hashing function has no collissions, and therefore any change to the artifact results in a change to its identity. In this way, the relationship between artifact and identity is immutable.

#### 4. Uniqueness

*An artifact can have precisely one artifact identity graph. All equivalent artifacts have the same graph.*

This implies that we must not include build tooling in the artifact tree, as doing otherwise would violate the Uniqueness requirement. For example, two reproducible build systems which rely on different auxiliary libraries (e.g., zlib) and result in byte-equivalent outputs **must** yield identical GitBOMs. 

For further exploration of this topic, see Wheeler's work on reproducibility as a means to verify trustability: [Countering Trusting Trust through Diverse Double-Compiling](https://dwheeler.com/trusting-trust/)

:::info
**Note the implication** that for any artifact, there can only be one artifact identity graph, but the reverse is not true. Each artifact identity graph may generate multiple artifacts (e.g., if different build parameters are used, or it is compiled on a different architecture, or different metadata, such as compile time, were embedded in the built artifact).
:::

#### 5. Transparently Opaque

*Artifacts and associated metadata may be obfuscated when sharing the artifact identity graph, while preserving other properties.*

Metadata about artifacts and their associated artifact trees may have varying levels of sensitivity.  GitBOM allows the supplier to reveal as little or as much as they, in negotiation with their consumers, choose.  The GitBOM tree itself is just a [merkel tree](https://en.wikipedia.org/wiki/Merkle_tree) of opaque hashes.  This provides transparency about the artifact tree and its structure, while allowing supplier modulated levels of opaequeness about the metadata.

#### 6. Truncatability of Tree



#### 7. Independent Metadata

*Artifacts may be associated, through their identity, to independently generated metadata stored outside of the artifact identity graph, such as an SBOM containing license and provenance metadata.*

There are many many many use cases that could use GitBOMs.  An incomplete list would include:

* Detecting potential vulnerabilities in executables/containers.
* Identifying Open Source License obligations
* Identifying commercial license obligations
* More reliable attestation
* Post exploit forensics

Undoubtably, more will arise.  Independence of metadata independent permissionless innovation around each use case without the need for cross domain coordination.  This lowers the cost of innovation and thus allows more productive innovation in this space.

#### 8. Authoritative Reference

#### 9. Non-reputability


### What GitBOM is not

1. Not a system for build reproducability, but it does provide information that is useful for that.
2. Not a version control system, though it is designed to co-exist with them.
3. Not an SBOM, though it is designed to complement them.
4. Not a globally unique software identifier (SWID).
5. Not reliant on any particular packaging or distribution mechanism, either for artifacts or for artifact identity graphs).


### Comparison to Software Bill Of Materials and our Objective

:::info
GitBOM is **not** an SBOM standard.
:::

From the GitBOM perspective, any SBOM document is a type of artifact which could be referenced in an artifact tree.

From an SBOM perspective, GitBOM is a common precise way to identify artifacts and their artifact trees, and nothing more. This makes GitBOM incapable of fulfilling many of the objectives of SBOMs, such as recording provenance, origination, build environment information, licensure, and other qualities.

:::info
Speaking strictly from an **SPDX 3.0-draft** perspective, GitBOM is a lossy serialization format that only includes the minimum metadata field of "Identifier".
:::

Current metadata formats, such as SPDX 2.x, as well as current systems to sign and transport metadata documents, do not *efficiently* support [our use case](#Objective) in the general case. They may well, however, support this use case in a specialized case, which we will discuss.

An argument can be made that current metadata formats can enable run-time analysis of the complete artifact tree. Achieving this would require (1) that generation of SBOM metadata be performed using compatible tooling by every project within the tree, (2) the documents' distrubion be consistent, and, crucially, (3) that a separate system exist to recursively fetch and parse metadata documents for all related projects and index them in a manner enabling efficient search.

Let us look briefly at these three adoption requirements in more detail to understand the implications for (and, at least, one motivation for hesitancy in uptake of) volunteer-maintained open source projects.

1. Current tooling to generate SBOM documents requires effort on the part of every OSS project maintainer to integrate with their build systems. While full SBOM generation *could* be integrated into compilers and linkers, as we propose for GitBOM, many view the complexity as overly burdensom on small projects, [creating a source of friction](https://opensource.com/article/21/8/open-source-maintainers) that has and may continue to hamper adoption. On the other hand, due to the pervasiveness of Git itself, we believe a minimalist approach that *already feels familiar* will be better received by this long tail of OSS projects.

2. One obstacle in the distribution and adoption of SBOMs has been competing standards (see the "Landscape" document for examples in addition to SPDX). By proposing to capture only the bare minimum metadata necessary to enable this scenario, we believe this proposal will avoid the ongoing debates about competing standards. *N.B.: Early socialization of this idea has received fairly wide support for the principle of a minimalist disk-based representation of the artifact tree.*

3. Run-time comparison, as described in the Objective, must be within the capabilities of even small and independent consumers of open source. A proposal which required large investments in infrastructure (e.g., that an operator maintain a database containing complete SBOM documents for the totality of open source) will not be seen as a reasonable requirement for smaller and independent organizations (even though it may make for a very compelling product offering, were someone to build and license it!).

### How will this intersect with reproducible build systems?

***TODO***

### Does this play well with In-Toto?

***TODO: Santiago***

### GitBOM and SWID

### GitBOM and pURL


## Examples

### Example: hello.c

Imagine we have the following two files:

`hello.c` has gitref `c64efd8bd8bceca8c69f9b5b7647cf0ff61fed59` and includes `stdio.h`

`stdio.h` has gitref `c0f35b8ae567f5348df3711496fdc0ef6f634169`

From these two inputs, we compile `hello.o`. The resulting GitBOM is a document (text file) containing the lexically ordered sequence of the gitrefs of each input artifact related to this build step:

```
blob⎵c0f35b8ae567f5348df3711496fdc0ef6f634169\n 
blob⎵c64efd8bd8bceca8c69f9b5b7647cf0ff61fed59\n
```

The gitref of the resulting document is `85322091b1d50a23d1c2a0f5933788a2a958f2ad`, and this document is written out to disk in a directory in the build environment, e.g.:

```
./.bom/object/85/322091b1d50a23d1c2a0f5933788a2a958f2ad
```

The compiler would also embed this gitref in a new elf section of the resulting `hello.o` binary; this adds a total of 89 bytes when accounting for elf section formatting.

### Example: OCI v2 / ORAS

Imagine we have the following Dockerfile:
```
FROM <baseimage>:<release>

RUN <command to install package>
```

We calculate the hash of `<baseimage>:<release>`, which is: `000TODO`.

Things get a little trickier when we go to  calculate the hash of the next layer.

Also, we want to produce an artifact tree that can reference the gitbom of any artifacts added to that layer, not merely a hash of the whole layer. We'll do that by ... *TODO* ...

Combining these together, we produce the following GitBOM document:
```
blob_000TODO
blob_000TODO
```
... and embed the gitref of this gitbom in the image manifest's `annotations` field, like so:

```
{
  "schemaVersion": 2,
  "config": {...},
  "layers": [ {...}, {...} ],
  "annotations": {
    "gitbom”: “sha256:abc123TODO”
  }
}
```
:::info
**NOTE**: The annotation type 'gitbom' is not yet standardized or accepted to OCI. In the above snipped, 'gitbom' is merely an example.
:::

### Example: truncating a tree for non-public subtrees

***TODO***

### Example: very large build systems (e.g., Linux)

***TODO***

## Proposed Implementation

### Spec for Compiled Artifacts

**TODO:** Replace / reformat examples as a specification
- *Describe implementation for GCC*
- *Describe implementation for LLVM*
- *Address container image composition*

### Spec for Non-compiled Artifacts

**TODO**
- *Address run-time compiled languages, such as python and java*


## How To Get Involved

### Taking a Phased Approach
1. (*we're here*) Refine this idea into a formal proposal
2. Build a command-line proof of concept to demonstrate the document storage format and interfaces
4. Engage with one or two compiled languages to prove the concept more fully
5. Verify with a one or two non-compiled languages
6. Socialize to foundations, companies, and conferences (ongoing now, Sept 2021)
7. ??? (*magic happens*)
8. Profit! (from the savings b/c oss projects' vulns can be found more easily)

### Language Support

Identify languages/compilers of initial interest:
- C#: Initial conversation with Terrapin folks went well, requested further feedback and examples of output format.
- Rust: early/exploratory conversations underway
- GCC: TODO
- LLVM: TODO
- GoLang: TODO
- Python: TODO

*What else?*

### Where to Engage

**Temporary Channel**: 
[Join the 'gitbom' channel](https://openssf.slack.com/archives/C02D1JYQLPQ) on the OpenSSF Slack Instance.

*Permanent Community location TBD*

## Credits & References

Many thanks to Ed Warnicke, who pitched this to me while I was stuck in Puget Sound traffic, and who has graciously accomodated my awkward schedule as we continued to discuss GitBOM while one or both of us were in a car.

* [GitBOM Intro Slides](https://docs.google.com/presentation/d/1-Mm-E9lqHQAXfDviVuD4Jk5CW6dJobFaFXT1TGRsowY/edit#slide=id.gdf5b542550_0_611) - General overview of GitBOM
* [Defending the Software Supply Chain](https://docs.google.com/presentation/d/14t_B2VrKqLDHZ6pPV7siSowRoAR7ZeRanbnxBOnrIBs/edit#slide=id.p) - describes supporting relationship between GitBOM, SLSA, sigstore, in-toto, SPIFFE/SPIRE 
* [GitBOM & LLVM](https://docs.google.com/presentation/d/1tYDASJEIogy7nLm0xNBeE_5UUig7iZGt7kIbg9BcanY/edit#slide=id.gdfabf90051_0_0) - describes potential integration with LLVM and embedded references in ELF headers 


Many thanks to everyone who added input and feedback to my "Landscape" document, though I now prefer the metaphor of a backpack: these are the tools one may choose to pack before *embarking on a journey into the OSS SSC landscape*. This reframing allowed me to identify a tool that was missing from my "supply chain backpack": the GitBOM.

* [OSS SSC Landscape](https://docs.google.com/document/d/1KT5QPCgVx_8UFIKv8-0k9GYjfcL3uvHmK4COOEGq_UQ/edit#heading=h.nx7cqnn6akii) - overview of the open source software supply chain "landscape"
* [Mapping industry role to sbom proximity](https://docs.google.com/drawings/d/14mi30Gd45RNCguXjgBdYb9TNhNxIFTJuyZjdyPWJBHc/edit) 
* [Mapping formats, artifacts, tools, storage, and identity](https://docs.google.com/drawings/d/1H0B9oKP_WN6wNlLqUjlVxC4PYLMzuDk002PfYJ0lyz4/edit)


Presentation & Discussion at CNCF STAG Supply Chain Working Group: https://youtu.be/FJRCKQAbhhY


Is SHA1 trustable for this purpose? Yes - https://badhomb.re/git/sha1/rant/2017/03/04/shattered.html 