+++
title = "SBOM"
toc = "true"
+++

## SBOMs
GitBOM is not an SBOM. It is designed to complement SBOMs, such as [SPDX](https://spdx.dev/), [CycloneDX](https://cyclonedx.org/), or [SWID](https://nvd.nist.gov/products/swid).

SBOMs tend to be defined as trees of ([artifact id](/glossary/artifact#artifact-identifiers),[metadata](#metadata)) tuples for a wide variety of metadata.

```mermaid
flowchart BT
    subgraph Artifact-1 [ ]
        direction TB
        Artifact-1-ID[Artifact-1 ID]
        Metadata-1[Metadata]
    end
    subgraph Artifact-2 [ ]
        direction TB
        Artifact-2-ID[Artifact-2 ID]
        Metadata-2[Metadata]
    end
    subgraph Artifact-3 [ ]
        direction TB
        Artifact-3-ID[Artifact-3 ID]
        Metadata-3[Metadata]
    end
    subgraph Artifact-4 [ ]
        direction TB
        Artifact-4-ID[Artifact-4 ID]
        Metadata-4[Metadata]
    end
    subgraph Artifact-5 [ ]
        direction TB
        Artifact-5-ID[Artifact-5 ID]
        Metadata-5[Metadata]
    end
    subgraph Artifact-6 [ ]
        direction TB
        Artifact-6-ID[Artifact-6 ID]
        Metadata-6[Metadata]
    end
    subgraph Artifact-7 [ ]
        direction TB
        Artifact-7-ID[Artifact-7 ID]
        Metadata-7[Metadata]
    end
    Artifact-2 --> Artifact-1
    Artifact-3 --> Artifact-1
    Artifact-4 --> Artifact-2
    Artifact-5 --> Artifact-2
    Artifact-6 --> Artifact-3
    Artifact-7 --> Artifact-3
```

## Metadata

Metadata is information *about* the artifact identified by the [artifact id](/glossary/artifact#artifact-identifiers).

Examples include but are not limited to:

- vendor
- release version
- contact information
- license
- copyright

## GitBOM Complements SBOM

Most SBOMs allow for 'external identifiers' and can thus use git refs to reference the artifacts in the GitBOM [artifact trees](/glossary/artifact_tree).

[GitBOM](/glossary/gitbom) helps improve SBOMs, it does not seek to *be* an SBOM.
