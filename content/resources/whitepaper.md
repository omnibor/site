+++
title = "Whitepaper"
toc = "true"
+++


GitBOM: Enabling Universal Artifact Traceability In Software Supply Chains
===

{{% notification type="info" %}}
Author: Aeva Black

Status: DRAFT

Last updated: 2022-01-25
{{% /notification %}}

## Summary

GitBOM is an application of the [git](https://en.wikipedia.org/wiki/Git) [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph), a widely used merkle tree with a flat-file storage format, to the challenge of creating build artifact dependency graphs in today's language-heterogeneous open source environments. Contrary to the name's appearance, GitBOM is neither dependent on `git` nor is it a Software Bill Of Materials (SBOM).

By generating artifact dependency graphs at build time, embedding the hash of the graph in produced artifacts, and referencing that hash in each subsequent build step, GitBOM will enable the creation of verifiable and complete artifact dependency graphs while requiring no effort from, or changes in, most open source projects. Furthermore, it will enable efficient correlation of vulnerability databases against a concise representation of the artifact dependency graph within run-time environments, if vulnerability databases can be correlated to source files or intermediary packages or libraries. These benefits would also accrue to closed-source projects that use the same build tools, and provide insights which span both open and closed source components in a consistent manner.

### Objective

It is desirable to enable efficient launch-time comparison of the verifiable and complete build tree of any executable component [1] against a then-current list of undesirable source files [2] which are known to be undesirable, where such a build tree contains unique referents for all sources from which the given executable object was composed. 

[1]: binary, dynamically-linked library, container image, etc.

[2]: because vulnerabilities may be discovered between the time an executable is created and the time when it is run, these processes must be decoupled


### Proposal

In an ideal scenario, an open source consumer would have available to them a complete artifact dependency graph, tracing dependencies to their ultimate depth. Even if we do not achieve this ideal, we should seek a solution with the lowest cost of adoption so as to enable the greatest buy-in across all open source ecosystems and communities.

For this reason we propose two areas of work:
1. enhancing artifact-generating tools (e.g., compilers, linkers, and container image generators) to also output metadata regarding their inputs and outputs
2. defining a storage format which represents the minimum information to describe the artifact dependency graph, and which uses git's on-disk storage format

Following from (1), this approach will require minimal to no effort on the part of open source project maintainers, thus significantly increasing its chances of widespread adoption as compared to any approach which requires maintainers to perform additional actions (e.g., implementing substantive changes in their CI/CD or package build pipeline to generate an SBOM).

Following from (2), this on-disk format provides an efficient and already well-understood method for cross referencing artifacts and source files by a deterministically-generated UUID (SHA1 or SHA256).


### ASCII-Art Flow Chart
```
 ┌─────────────────────────────-┐
 │ Build Time: Graph Generation │
 │                              │
 │ ┌────────┐   ┌────────┐      │
 │ │ Src  A │   │ Src  B │      │
 │ └───┬────┘   └──┬─────┘      │
 │     │           │            │
 │     ▼           │            │
 │  ┌───────┐      │            │
 │  │ Obj A │      │            │
 │  └─────┬─┘      │            │
 │        │        │            │
 │        ▼        ▼            │
 │        ┌─────────────┐       │
 │        │ Compilation │       │
 │        │  & Signing  │       │
 │        └─────┬───────┘       │
 │              │               │
 └──────────────┼──────────────-┘
                │
             ┌──▼─┐
             ▼    ▼
   ┌──────────┐   ┌──────-┐
   │ [header] ├──►│gitbom │
   │executable│   │ graph │
   └──────┬───┘   └┬─────-┘
          │        │
  ┌───────┼────────┼────────────────────────────┐
  │       │        │     Run Time: Comparison   │
  │       │        │                            │
  │       ▼        ▼            ┌────────────┐  │
  │     ┌───────────────┐       │   Public   │  │
  │     │     Policy    │◄─────►│    Vuln    │  │
  │     │  Enforcement  │       │  Database  │  │
  │     └─┬─────────────┘       └────────────┘  │
  │       │                           |         │
  │       ▼                           ▼         │
  │      ┌─────────────┐       ┌────────────┐   │
  │      │ Runtime     |       |  Scanning  |   |
  |      | Environment │◄─────►│    Tools   |   │
  │      └─────────────┘       └────────────┘   │
  │                                             │
  └─────────────────────────────────────────────┘

```


## GitBOM

GitBOM is an approach which has the following properties:
1. re-uses a well understood paradigm for modelling artifact relationships efficiently in flat files on disk in a machine-readable format
2. optimally efficient approach for run-time comparison of any given binary object against a dataset of signatures of known-vulnerable inputs 
3. does not require project maintainers to make any changes to their workflow in order to comply with the [Biden Executive Order](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/)
4. has a bounded scope of work to achieve near-complete coverage of the F/OSS landscape
5. could be integrated with both free and commercial services

### Characteristics

1. **Artifact Equivalence**: Two artifacts are equivalent IFF `[]byte(artifact1) == []byte(artifact2)`.
2. **Artifact Identity**: Independent parties, presented with equivalent artifacts, derive the same artifact identity.
3. **Immutability**: An identified artifact can not be modified without also changing its identity.
4. **Uniqueness**: An artifact can have precisely *one* artifact identity graph. All equivalent artifacts have the same graph.
5. **Transparently Opaque**: Artifacts and associated metadata may be obfuscated when sharing the artifact identity graph, while preserving other properties.
6. **Truncatability of Graph**: Artifact identity graphs may themselves be treated as artifacts, enabling truncation of a part of the graph and replacing the leading node with a signature of the sub-graph, thereby preserving all other properties with respect to the whole.
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

*An identified artifact cannot be modified without also changing its identity. Non-equivalent artifacts have distinct identities.*

"An identified artifact" means an artifact whose identity has been determined. "Can not be modified without also changing its identity" means that the deterministic hashing function has no collisions, and therefore any change to the artifact results in a change to its identity. In this way, the relationship between artifact and identity is immutable.

#### 4. Uniqueness

*An artifact can have precisely one artifact identity graph. All equivalent artifacts have the same graph.*

This implies that we must not include build tooling in the artifact dependency graph, as doing otherwise would violate the Uniqueness requirement. For example, two reproducible build systems which rely on different auxiliary libraries (e.g., zlib) and result in byte-equivalent outputs **must** yield identical GitBOMs. 

For further exploration of this topic, see Wheeler's work on reproducibility as a means to verify trustability: [Countering Trusting Trust through Diverse Double-Compiling](https://dwheeler.com/trusting-trust/)

{{% notification type="info" %}}
**Note the implication** that for any artifact, there can only be one artifact identity graph, but the reverse is not true. Each artifact identity graph may generate multiple artifacts (e.g., if different build parameters are used, or it is compiled on a different architecture, or different metadata, such as compile time, were embedded in the built artifact).
{{% /notification %}}

#### 5. Transparently Opaque

*Artifacts and associated metadata may be obfuscated when sharing the artifact identity graph, while preserving other properties.*

Metadata about artifacts and their associated artifact dependency graphs may have varying levels of sensitivity.  GitBOM allows the supplier to reveal as little or as much as they, in negotiation with their consumers, choose.  The GitBOM graph itself is just a [merkel tree](https://en.wikipedia.org/wiki/Merkle_tree) of opaque hashes.  This provides transparency about the artifact dependency graph and its structure, while allowing supplier modulated levels of opaequeness about the metadata.

#### 6. Truncatability of Graph



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

{{% notification type="info" %}}
GitBOM is **not** an SBOM standard.
{{% /notification%}}

From the GitBOM perspective, any SBOM document is a type of artifact which could be referenced in an artifact dependency graph.

From an SBOM perspective, GitBOM is a common precise way to identify artifacts and their artifact dependency graphs, and nothing more. This makes GitBOM incapable of fulfilling many of the objectives of SBOMs, such as recording provenance, origination, build environment information, licensure, and other qualities.

{{% notification type="info" %}}
Speaking strictly from an **SPDX 3.0-draft** perspective, GitBOM is a lossy serialization format that only includes the minimum metadata field of "Identifier".
{{% /notification %}}

Current metadata formats, such as SPDX 2.x, as well as current systems to sign and transport metadata documents, do not *efficiently* support [our use case](#Objective) in the general case. They may well, however, support this use case in a specialized case, which we will discuss.

An argument can be made that current metadata formats can enable run-time analysis of the complete artifact dependency graph. Achieving this would require (1) that generation of SBOM metadata be performed using compatible tooling by every project within the graph, (2) the documents' distrubion be consistent, and, crucially, (3) that a separate system exist to recursively fetch and parse metadata documents for all related projects and index them in a manner enabling efficient search.

Let us look briefly at these three adoption requirements in more detail to understand the implications for (and, at least, one motivation for hesitancy in uptake of) volunteer-maintained open source projects.

1. Current tooling to generate SBOM documents requires effort on the part of every OSS project maintainer to integrate with their build systems. While full SBOM generation *could* be integrated into compilers and linkers, as we propose for GitBOM, many view the complexity as overly burdensom on small projects, [creating a source of friction](https://opensource.com/article/21/8/open-source-maintainers) that has and may continue to hamper adoption. On the other hand, due to the pervasiveness of Git itself, we believe a minimalist approach that *already feels familiar* will be better received by this long tail of OSS projects.

2. One obstacle in the distribution and adoption of SBOMs has been competing standards (see the "Landscape" document for examples in addition to SPDX). By proposing to capture only the bare minimum metadata necessary to enable this scenario, we believe this proposal will avoid the ongoing debates about competing standards. *N.B.: Early socialization of this idea has received fairly wide support for the principle of a minimalist disk-based representation of the artifact dependency graph.*

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

`hello.c` has gitoid `c64efd8bd8bceca8c69f9b5b7647cf0ff61fed59` and includes `stdio.h`

`stdio.h` has gitoid `c0f35b8ae567f5348df3711496fdc0ef6f634169`

From these two inputs, we compile `hello.o`. The resulting GitBOM is a document (text file) containing the lexically ordered sequence of the gitoids of each input artifact related to this build step:

```
blob⎵c0f35b8ae567f5348df3711496fdc0ef6f634169\n 
blob⎵c64efd8bd8bceca8c69f9b5b7647cf0ff61fed59\n
```

The gitoid of the resulting document is `85322091b1d50a23d1c2a0f5933788a2a958f2ad`, and this document is written out to disk in a directory in the build environment, e.g.:

```
./.bom/object/85/322091b1d50a23d1c2a0f5933788a2a958f2ad
```

The compiler would also embed this gitoid in a new elf section of the resulting `hello.o` binary; this adds a total of 89 bytes when accounting for elf section formatting.

### Example: OCI v2 / ORAS

Imagine we have the following Dockerfile:
```docker
FROM <baseimage>:<release>
RUN <command to install package>
```

We calculate the hash of `<baseimage>:<release>`, which is: `000TODO`.

Things get a little trickier when we go to  calculate the hash of the next layer.

Also, we want to produce an artifact dependency graph that can reference the gitbom of any artifacts added to that layer, not merely a hash of the whole layer. We'll do that by ... *TODO* ...

Combining these together, we produce the following GitBOM document:
```
blob_000TODO
blob_000TODO
```
... and embed the gitoid of this gitbom in the image manifest's `annotations` field, like so:

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
{{% notification type="info" %}}
**NOTE**: The annotation type 'gitbom' is not yet standardized or accepted to OCI. In the above snipped, 'gitbom' is merely an example.
{{% /notification %}}

### Example: truncating a graph for non-public subgraphs

***TODO***

### Example: very large build systems (e.g., Linux)

***TODO***

## Proposed Implementation

### For Compiled Artifacts

**TODO:** Replace / reformat examples as a specification
- *Describe implementation for GCC*
- *Describe implementation for LLVM*
- *Address container image composition*

### For Non-compiled Artifacts

**TODO**
- *Address run-time compiled languages, such as python and java*


## Credits and Gratitudes

I must thank Ed Warnicke, who pitched this idea to me one sunny summer afternoon in 2021 while I was stuck in Puget Sound traffic, and who graciously accomodated my awkward schedule throughout the rest of the year, most often while both of us were in a car.

I must also thank everyone who provided input and feedback to my "Open Source Landscape" document in 2021, which I have since migrated to a [github repo](https://github.com/AevaOnline/supply-chain-synthesis). The knowledge I gained through those discussions allowed me to identify a tool that was missing from my "supply chain backpack": the GitBOM.
