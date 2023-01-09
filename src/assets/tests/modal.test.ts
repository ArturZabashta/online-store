import { describe, expect, it, jest } from '@jest/globals';
import { renderModal } from "../ts/components/modal";

describe('shoud be defined', () => {
    it('defined modal', () => {
    expect(renderModal).toBeDefined();
    expect(renderModal).not.toBeUndefined();
    })
})