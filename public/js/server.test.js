const request = require('supertest');
const express = require('express');
const app = require('../../../kino-ssr/server');

describe('Integration tests', () => {
    it('should verify that movie pages display the correct title', async () => {
        const movies = [
            { title: 'Movie 1', image: 'image1.jpg', intro: 'Intro 1', publishedAt: '2023-01-01' },
            { title: 'Movie 2', image: 'image2.jpg', intro: 'Intro 2', publishedAt: '2023-02-01' }
        ];

        for (const movie of movies) {
            const response = await request(app).get('/movie-info').query(movie);
            expect(response.status).toBe(200);
            expect(response.text).toContain(movie.title);
        }
    });
});