# MEC_tools
Some useful tool for my worklife in MEC portal team.

---

##### Dependencies must be installed on a per-environment basis.
>1. git clone [this project]
>2. cd MEC_TOOLS
>3. npm install
>4. npm start

---

## Git Policy
```mermaid
sequenceDiagram
    feature/[feature_name] ->> develop: merge
    develop ->> develop/release_[date]: merge
    develop/release_[date] ->> master: merge
    master ->> develop: pull
    develop ->> feature/[feature_name]: create branch/pull
```