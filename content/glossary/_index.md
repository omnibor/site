---
title: Glossary
template: glossary.html
---

The following is a glossary of terms defined by the OmniBOR project. For the
current precise definitions, refer to the [specification].

## Artifact

An artifact is any software object of interest.

Examples:

- source code file (of any language)
- `.o` object file
- `.so` shared object file
- `.class` Java class file
- `.jar` file
- `.pyc` compiled python file
- executable file
- container image

What all artifacts have in common is that they are all arrays of bytes.

## Artifact Equivalency

Two artifacts are equivalent if and only if their byte representations are
exactly equal.

## Derived Artifacts

Most artifacts are produced by a [build tool](#build-tool) consuming some set
of input artifacts to produce an artifact as an output. Such artifacts are said
to be 'derived artifacts'.

## Leaf Artifacts

Artifacts which are not 'derived artifacts' are said to be 'leaf artifacts'.
Leaf artifacts are usually source code files constructed by hand by humans.

Examples:

- "`foo.o` is derived from `foo.c` and `bar.h` using `gcc`"
- "`fooexecutable` is derived from `foo.o` and `baz.o` using `ld`"
- "`foo.class` is derived from `foo.java` using `javac`"

## Artifact ID

It should be possible to identify each artifact with an Artifact ID.

Artifact IDs should have the following characteristics:

**Canonical**
: Independent parties, presented with equivalent artifacts, derive the same
  Artifact ID.

**Unique**
: Non-equivalent artifacts have distinct Artifact IDs.

**Immutable**
: An artifact cannot be modified without also changing its Artifact ID.

OmniBOR uses the [GitOID](#gitoid) of an artifact as its
Artifact ID.

Source code [leaf artifacts](#leaf-artifacts) are typically already being
stored in [Git](#git) where they are identified via their [GitOID](#gitoid).

## Artifact Dependency Graph

The Artifact Dependency Graph (ADG) of an [artifact](#artifact) is the
DAG (Directed Acyclic Graph) of all the ['leaf artifacts'](#leaf-artifacts) that
are transformed by a [build tool](#build-tool) into that artifact. This
includes the direct input artifacts, and the transitive set of artifacts to
each input artifact, all the way down to source code.

### Examples

Simple C Executable

{% mermaid() %}
flowchart BT
    c1[.c] --> o1[.o]
    h1.1[.h] --> o1[.o]
    h1.2[.h] --> o1[.o]
    c2[.c] --> o2[.o]
    h2.1[.h] --> o2[.o]
    h2.2[.h] --> o2[.o]
    o1 --> executable
    o2 --> executable
{% end %}

Running C Executable with Shared Object

{% mermaid() %}
flowchart BT
    c1[.c] --> o1[.o]
    h1.1[.h] --> o1[.o]
    h1.2[.h] --> o1[.o]
    c2[.c] --> o2[.o]
    h2.1[.h] --> o2[.o]
    h2.2[.h] --> o2[.o]
    o1 --> executable
    o2 --> executable
    c3[.c] --> o3[.o]
    h3.1[.h] --> o3[.o]
    h3.2[.h] --> o3[.o]
    c4[.c] --> o4[.o]
    h4.1[.h] --> o4[.o]
    h4.2[.h] --> o4[.o]
    o3 --> .so
    o4 --> .so
    executable --> running[running executable]
    .so --> running[running executable]
{% end %}

Java Example

{% mermaid() %}
flowchart BT
    java1[.java] --> cls1[.class]
    java2[.java] --> cls2[.class]
    java3[.java] --> cls3[.class]
    java4[.java] --> cls4[.class]
    java5[.java] --> cls5[.class]
    cls1 --> running[running executable]
    cls2 --> running[running executable]
    cls3 --> running[running executable]
    cls4 --> running[running executable]
    cls5 --> running[running executable]
{% end %}

Go Example

{% mermaid() %}
flowchart BT
    go1[.go] --> o1[.o]
    go2[.go] --> o2[.o]
    go3[.go] --> o3[.o]
    go4[.go] --> o4[.o]
    go5[.go] --> o5[.o]
    o1 --> executable
    o2 --> executable
    o3 --> executable
    o4 --> executable
    o5 --> executable
{% end %}

Python Example

{% mermaid() %}
flowchart BT
    py1[.py] --> pyc1[.pyc]
    py2[.py] --> pyc2[.pyc]
    py3[.py] --> pyc3[.pyc]
    py4[.py] --> pyc4[.pyc]
    py5[.py] --> pyc5[.pyc]
    pyc1 --> running[running executable]
    pyc2 --> running[running executable]
    pyc3 --> running[running executable]
    pyc4 --> running[running executable]
    pyc5 --> running[running executable]
{% end %}

## Build Tool

A build tool is something which reads one or more input [artifacts](#artifact)
and writes one or more output [artifacts](#artifact).

{% mermaid() %}
flowchart LR
    input1 --> buildtool[build tool] --> output
    input2 --> buildtool[build tool]
    input3 --> buildtool[build tool]
{% end %}

Examples:

* C compiler consumes one `.c` file and zero or more `.h` files to produce a
  `.o` file

{% mermaid() %}
flowchart LR
    .c --> compiler[[compiler]]
    *.h --> compiler[[compiler]]
    compiler --> .o
{% end %}

* C linker consumes one or more `.o` files to produce an executable file

{% mermaid() %}
flowchart LR
    *.o --> linker[[linker]]
    linker --> executable
{% end %}

* C linker consumes one or more `.o` files to produce a shared object

{% mermaid() %}
flowchart LR
    *.o --> linker[[linker]]
    linker --> .so
{% end %}

* Dynamic linker consumes an executable file and zero or more shared objects to
  produce a running process

{% mermaid() %}
flowchart LR
    executable --> linker[[dynamic linker]]
    *.so --> linker[[dynamic linker]]
    linker --> running[running executable]
{% end %}

* Java compiler consumes a `.java` file to produce a `.class` file

{% mermaid() %}
flowchart LR
    .java --> compiler[[compiler]]
    compiler --> classfile[.class]
{% end %}

* Java runtime consumes one or more `.class` files to produce a running process

{% mermaid() %}
flowchart LR
    classfile[*.class] --> runtime[[runtime]]
    runtime --> running[running executable]
{% end %}

* Python bytecode compiler consumes a `.py` file to produce a `.pyc` file

{% mermaid() %}
flowchart LR
    .py --> compiler[[compiler]]
    compiler --> .pyc
{% end %}

The totality of ancestors for a given artifact may be represented as an
[Artifact Dependency Graph (ADG)](#artifact-dependency-graph).

## Code Generators

Typically, source code files are hand written by humans, and as such are
[leaf artifacts](#leaf-artifacts) in the
[Artifact Dependency Graph (ADG)](#artifact-dependency-graph).

Source code files can also be **generated** from other inputs by a code
generator.

{% mermaid() %}
flowchart LR
    input[input] --> codegenerator[[code generator]] --> generatedsrc[generated source code file]
{% end %}

In this scenario, the generated source code file is a
[derived artifact](#derived-artifacts). This is because the
[code generator](#code-generators) is a [build tool](#build-tool) and, by
definition, the output from the [build tool](#build-tool) is a
[derived artifact](/glossary/artifact/#derived-artifacts).

Code generation is very common in many languages.
See [go generate](https://eli.thegreenplace.net/2021/a-comprehensive-guide-to-go-generate/),
[Java Xtend](https://www.eclipse.org/xtend/), and
[qtcpp](https://qface.readthedocs.io/en/latest/qtcpp.html) for examples.

## Git

[Git](https://git-scm.com/) is an object store masquerading as a source
code management system (SCM).

Git's storage model stores source code and metadata using a Merkel tree.

## Git Objects

Git Objects are represented as follows:

{{ img(path = "/glossary/git_object.svg", alt = "Git Object") }}

* `${type}` - Git Object Type as a string
  - `blob` - any bytes
  - `tree` - represents a filesystem tree
  - `commit` - represents a Git commit
  - `tag` - represents a Git tag
* `${size}`: size in bytes of `${content}` represented as a string base 10.
* `${content}`: the byte content of the object

## Git Blob

A Git [blob](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)
(binary large object) is the type used for file contents in git:

{{ img(path = "/glossary/git_blob.svg", alt = "Git Blobs") }}

- `${content}` - bytes of the file contents
  - Does not include filename or path
  - Does not include mode information
  - Does not include *any* metadata
  - Just the contents
  - **Any file anywhere with the same contents will have the same 'blob' object**
  - **Any file anywhere with the same contents will have the same GitOID**

## GitOID

Git Blobs are identified by the SHA-1 hash of the blob object with the GitOID
construction, which first hashes in a string containing the object type, an
ASCII space character, the length of the content in number of bytes, and an
ASCII null terminator character:

{{ img(path = "/glossary/gitoid.svg", alt = "GitOIDs") }}

## OmniBOR

An [artifact dependency graph](#artifact-dependency-graph) can be represented as
a graph with nodes identified by an [Artifact ID](#artifact-id). In the examples
below, we only show tree structures for simplicity.

{% mermaid() %}
flowchart BT
    Artifact-2[Artifact-2 ID] --> Artifact-1[Artifact-1 ID]
    Artifact-3[Artifact-3 ID] --> Artifact-1[Artifact-1 ID]
    Artifact-4[Artifact-4 ID] --> Artifact-2[Artifact-2 ID]
    Artifact-5[Artifact-5 ID] --> Artifact-2[Artifact-2 ID]
    Artifact-6[Artifact-6 ID] --> Artifact-3[Artifact-3 ID]
    Artifact-7[Artifact-7 ID] --> Artifact-3[Artifact-3 ID]
{% end %}

OmniBOR uses the [GitOID](#gitoid) of an artifact as its
[Artifact ID](#artifact-id).

{% mermaid() %}
flowchart BT
    Artifact-2[Artifact-2 gitoid] --> Artifact-1[Artifact-1 gitoid]
    Artifact-3[Artifact-3 gitoid] --> Artifact-1[Artifact-1 gitoid]
    Artifact-4[Artifact-4 gitoid] --> Artifact-2[Artifact-2 gitoid]
    Artifact-5[Artifact-5 gitoid] --> Artifact-2[Artifact-2 gitoid]
    Artifact-6[Artifact-6 gitoid] --> Artifact-3[Artifact-3 gitoid]
    Artifact-7[Artifact-7 gitoid] --> Artifact-3[Artifact-3 gitoid]
{% end %}

## Input Manifest

The parent-child relationship is captured by a set of Input Manifests.

Each artifact has an Input Manifest that describes its immediate children
consiting of a set of new line delimited records, one for each child, in
lexical order.

A child artifact which is itself a [leaf artifact](#leaf-artifacts) would be
represented by:

```
${Artifact ID of child}\n
```

A child artifact which is itself a [derived artifact](#derived-artifacts) would
be represented by:

```
${Artifact ID of child}⎵manifest⎵${Artifact ID of child's Input Manifest}\n
```

Example:

{% mermaid() %}
flowchart BT
    Artifact-2[Artifact-2 Artifact ID] --> Artifact-1[Artifact-1 Artifact ID]
    Artifact-3[Artifact-3 Artifact ID] --> Artifact-1[Artifact-1 Artifact ID]
    Artifact-4[Artifact-4 Artifact ID] --> Artifact-2[Artifact-2 Artifact ID]
    Artifact-5[Artifact-5 Artifact ID] --> Artifact-2[Artifact-2 Artifact ID]
    Artifact-6[Artifact-6 Artifact ID] --> Artifact-3[Artifact-3 Artifact ID]
    Artifact-7[Artifact-7 Artifact ID] --> Artifact-3[Artifact-3 Artifact ID]
{% end %}

Artifact-2's Input Manifest:

```
gitoid:sha256\n
${Artifact ID of Artifact-4}\n
${Artifact ID of Artifact-5}\n
```

Artifact-3's Input Manifest:

```
gitoid:sha256\n
${Artifact ID of Artifact-6}\n
${Artifact ID of Artifact-7}\n
```

Artifact-1's Input Manifest:

```
gitoid:sha256\n
${Artifact ID of Artifact-2}⎵manifest⎵${Artifact ID of Artifact-2's Input Manifest}\n
${Artifact ID of Artifact-3}⎵manifest⎵${Artifact ID of Artifact-2's Input Manifest}\n
```

### Embedding of Artifact IDs for Input Manifests

OmniBOR advocates for [build tools](#build-tool) to embed into each
[derived artifact](#derived-artifacts) the Artifact ID of that derived
artifact's Input Manifest.

Examples:

**ELF Files (Executables and `.so`, and `.o` files)**
: Embed Input Manifest Artifact ID into an ELF section named `.omnibor`

**ar Files (`.a` static libraries)**
: Embed Input Manifest Artifact ID into an archive entry named `.omnibor`

**General Archive files (`tar`, `gzip`, etc.)**
: Embed Input Manifest Artifact ID into an archive entry named `.omnibor`

**Java `.class` file**
: Embed Input Manifest Artifact ID into an annotation named `@OMNIBOR` in the
  `.class` file.

**Python `.pyc` files**
: Embed Input Manifest Artifact ID into an `__omnibor__` in the `.pyc` file.

**Container Images**
: Embed Input Manifest Artifact ID into the image manifest as an annotation
  named `dot.omnibor`

**Generated Source Code**
: Embed Input Manifest Artifact ID for a generated source code file using a
  comment

## SBOM

OmniBOR is not a Software Bill of Materials (SBOM). It is designed to
complement SBOMs, such as [SPDX](https://spdx.dev/) or
[CycloneDX](https://cyclonedx.org/).

[OmniBOR](#omnibor) can help [SBOMs](#sbom) be more precise and reliable.

Most [SBOMs](#sbom) allow for 'external identifiers' and can thus use
[Artifact IDs](#artifact-id) to reference the artifacts in the OmniBOR
[Artifact Dependency Graph (ADG)](#artifact-dependency-graph). This allows an
[SBOM](#sbom) describing a specific component, e.g.
`Component Name: Django` and `Component Version: 1.11.1`, to reference a list
of applicable [Artifact IDs](#artifact-id).

This is helpful because today two different tools might produce two different
SBOMs for the same software [artifact](#artifact). This could occur if the SBOM
generation tools use different sources to identify and describe the component.
OmniBOR provides a precise software [Artifact ID](#artifact-id) which can be
used in SBOMs in situations where naming schemes may be ambiguous.

**Example 1**: If one SBOM generation tool uses [CPEs](https://nvd.nist.gov/products/cpe):

```
cpe:2.3:a:djangoproject:django:1.11.1:*:*:*:*:*:*:*
```

and the other uses [Package URLs (pURLs)](https://github.com/package-url/purl-spec):

```
pkg:pypi/django@1.11.1
```

&hellip; then these two SBOMs might diverge when they define the component
supplier: it could be `Component Supplier: djangoproject` or
`Component Supplier: pypi`.

 **Example 2:** In another instance a vendor might choose to use their
 product's current marketing name for the component name in their SBOM
 generation tools, whereas third-party SBOM generation tools might use the
 vendor's product name as listed in a [CPE](https://nvd.nist.gov/products/cpe)
 or [SWID tag](https://nvd.nist.gov/products/swid).

 By enabling both SBOM generation tools to list the OmniBOR Artifact ID(s) for
 associated with the component, an SBOM consumer can quickly understand that
 both SBOMs do describe the same artifact, regardless of ambiguities in naming
 schemes.

[specification]: @/spec/_index.md
